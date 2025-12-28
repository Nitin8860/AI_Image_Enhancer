import axios from "axios";

const API_KEY = "wxnh0ea6l8j523vvt"
const BASE_URL = "https://techhk.aoscdn.com"

const MAXIMUM_RETRIES = 20;

export const enhancedImageAPI = async (file)=>{
    // code to call API and get enhanced image URL

    try {

        const taskId = await uploadImage(file);
        console.log("Image Uploaded Successfully , Task ID:", taskId);

        
        const enhancedImageData = await PoolForEnhancedImage(taskId);
        console.log("Enhanced Image Data", enhancedImageData);

        return enhancedImageData;
        

    } catch (error) {
        console.log("Error enhancing image", error.message);
        
    }

}

const uploadImage = async(file)=>{
    // code to upload image
    const formData = new FormData();
    formData.append("image_file", file);

    const {data} = await axios.post(`${BASE_URL}/api/tasks/visual/scale`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": API_KEY,
        }
    })

    console.log("upload api response" , data)


    // /api/tasks/visual/scale  --post

    if(!data?.data?.task_id){
        throw new Error("Failed to uploas image!  Task id not found");
    }
    return data.data.task_id;
}

const fetchEnhancedImage = async(taskId)=>{
    //fetch enhanced image
    const {data} = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`, {
        headers: {
            "X-API-KEY": API_KEY,
        }
    })

    if(!data?.data){
        throw new Error("Failed to fetch enhanced image! Image not found")
    }
    return data.data;


    // /api/tasks/visual/scale/{task_id}  --get
}


const PoolForEnhancedImage = async(taskId , retries = 0)=>{
    const result = await fetchEnhancedImage(taskId);

    if(result.state === 4 ){
        console.log("Processing.....")

        if(retries >= 20) {
            throw new Error("Max tries rech. Please try again later.....")
        }

        // wait for 2 sec

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return PoolForEnhancedImage(taskId , retries + 1);
    }
    console.log("Enhanced Image URL :" , result)
    return result;
}