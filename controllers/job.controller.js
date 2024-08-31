import  {Job} from "../models/job.model.js";


export const postJob=async(req,res) =>{
    try {
    const{title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
    const userId=req.id;
    if(!title || !description ||!requirements || !salary|| !location || !jobType || !experience || !position || !companyId){
       return res.status(400).json({
        message:"Something is missing",
        success:false
       });
    };
    const job=await Job.create({
        title,
        description,
    requirements:requirements.split(","),
    salary:Number(salary),
    location,
    jobType,
    experienceLevel:experience,
    position,
    company:companyId,
    createdBy:userId,

    });
    return res.status(201).json({
        message:"New job created succesfully",
        job,
        success:true
    });
} catch (error) {
    console.log(error);
    
}

}

export const getAllJobs=async(req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword, $options:"i"}},
         {description:{$regex:keyword, $options:"i"}},
            ]
        };
        const jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
         if(!jobs || jobs.length === 0){
            return res.status(404).json({
                message:"Jobs NOt Found",
                success:false,
            })
         }
         return res.status(200).json({  
            jobs,
            success: true,
          });
    } catch (error) {
        console.log(error);
        
    }
}


export const getJobById =async(req,res)=>{
    try {
       const jobId=req.params.id;
       const job=await Job.findById(jobId);
     
       if(!job){
        return res.status(404).json({
            message:"Jobs not found",
            success:true,
        });
       }

       return res.status(200).json({
        job,
        success:true
       });



    } catch (error) {
        console.log(error);
    }
}

export const getAdminJobs =async(req, res) =>{
    try {
       const adminId=req.id;
       const jobs=await Job.find({createdBy:adminId});
       if(!jobs){
        return res.status(400).json({
            message:"Jobs not found",
            success:true,
        });

       } 
       return res.status(200).json({
         jobs,
         success:true
       })
    }
     catch (error) {
       console.log(error) 
    }
}