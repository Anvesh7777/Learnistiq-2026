import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from "../models/purchase.model.js";
import { Review } from "../models/review.model.js";
import { User } from "../models/user.model.js";

export const createCourse =async (req,res)=>{
    
    const adminId=req.adminId;
    const {title,description,price,instructor}=req.body;
    console.log(title, description, price,instructor);

    try {
        if(!title || !description || !price){
            return res.status(400).json({errors: "All fields are required"});

        }  

        const{image}=req.files
        if(!req.files || Object.keys(req.files).length==0){
            return res.status(400).json({ errors: "no file uploaded"});
        }
        
        const allowedFormat=["image/png", "image/jpeg"]
        if(!allowedFormat.includes(image.mimetype)){
            return res.status(400).json({errors: "Invalid file format. Only PNG and JPD are allowed"})
        }

        // cloudinary code
        const cloud_response=await cloudinary.uploader.upload(image.tempFilePath)
        if(!cloud_response || cloud_response.error){
            return res.status(400).json({errors: "Error uploading file to cloudinary"});
        }

        //storing data in database
        const courseData={
            title,
            description,
            price,
            instructor,
            image: {
                public_id: cloud_response.public_id,
                url: cloud_response.secure_url,
            },
            creatorId:adminId
        }
        const course = await Course.create(courseData);
        res.json({
            message:"Course created successfully",
            course,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Error creating course"});
    }
};

export const updateCourse = async (
  req,
  res
) => {
  const adminId = req.adminId;
  const { courseId } = req.params;

  const {
    title,
    description,
    price,
    instructor,
    image,
  } = req.body;

  try {
    const courseSearch =
      await Course.findById(
        courseId
      );

    if (!courseSearch) {
      return res.status(404).json({
        errors:
          "Course not found",
      });
    }

    const updateData = {
      title,
      description,
      price,
      instructor,
    };

    if (image) {
      updateData.image = {
        public_id:
          image.public_id,
        url: image.url,
      };
    }

    const course =
      await Course.updateOne(
        {
          _id: courseId,
          creatorId: adminId,
        },
        updateData
      );

    return res.status(200).json({
      success: true,
      message:
        "Course updated successfully",
      course,
    });
  } catch (error) {
    console.log(
      "Error in course updating:",
      error
    );

    return res.status(500).json({
      errors:
        "Error in course updating",
    });
  }
};


export const deleteCourse=async(req,res)=>{
    const adminId=req.adminId;
    const {courseId}=req.params;
    try{
        const course = await Course.findOneAndDelete({ _id: courseId });
        if(!course){
            return res.status(404).json({error:"Course not found"})
        }
        res.status(200).json({message:"Course deleted successfully"})
    } catch(error){
       res.status(500).json({errors:"Error in deleting course"})
       console.log("Error in deleting course", error);
    }
}

export const getCourses = async (
  req,
  res
) => {
  try {
    const page =
      Number(
        req.query.page
      ) || 1;

    const limit =
      Number(
        req.query.limit
      ) || 12;

    const skip =
      (page - 1) *
      limit;

    const courses =
      await Course.find({})
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    const totalCourses =
      await Course.countDocuments();

    return res.status(200).json({
      success: true,
      currentPage:
        page,
      totalPages:
        Math.ceil(
          totalCourses /
            limit
        ),
      totalCourses,
      courses,
    });
  } catch (error) {
    console.log(
      "Get courses error:",
      error
    );

    return res.status(500).json({
      errors:
        "Error fetching courses",
    });
  }
};

export const getCourseById = async (req, res) => {
    try {
      const courseId = req.params.courseId;
  
      const course = await Course.findById(courseId); // Assuming you’re using Mongoose
  
      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }
  
      res.status(200).json({ success: true, course });
    } catch (error) {
      console.error("Error getting course:", error);
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  };

export const buyCourses = async (
  req,
  res
) => {
  const { userId } = req;
  const { courseId } =
    req.params;

  try {
    const course =
      await Course.findById(
        courseId
      );

    if (!course) {
      return res.status(404).json({
        errors:
          "Course not found",
      });
    }

    const existingPurchase =
      await Purchase.findOne({
        userId,
        courseId,
      });

    if (
      existingPurchase
    ) {
      return res.status(400).json({
        errors:
          "You have already purchased this course",
      });
    }

    const purchase =
      await Purchase.create({
        userId,
        courseId,
        status: "success",
      });

    const user =
      await User.findById(
        userId
      );

    if (!user) {
      return res.status(404).json({
        errors:
          "User not found",
      });
    }

    const alreadyAdded =
      user.purchasedCourses.some(
        (id) =>
          id.toString() ===
          courseId
      );

    if (
      !alreadyAdded
    ) {
      user.purchasedCourses.push(
        courseId
      );

      await user.save();
    }

    return res.status(201).json({
      success: true,
      message:
        "Course purchased successfully",
      purchase,
    });
  } catch (error) {
    console.log(
      "Error in course buying:",
      error
    );

    return res.status(500).json({
      errors:
        "Error purchasing course",
    });
  }
};

export const addReview = async (
  req,
  res
) => {
  try {
    const { userId } = req;
    const { courseId } = req.params;

    const {
      rating,
      comment,
    } = req.body;

    const purchase =
      await Purchase.findOne({
        userId,
        courseId,
        status: "success",
      });

    if (!purchase) {
      return res.status(403).json({
        errors:
          "Purchase course before reviewing",
      });
    }

    const existingReview =
      await Review.findOne({
        userId,
        courseId,
      });

    if (existingReview) {
      return res.status(400).json({
        errors:
          "Review already submitted",
      });
    }

    await Review.create({
      userId,
      courseId,
      rating,
      comment,
    });

    const reviews =
      await Review.find({
        courseId,
      });

    const averageRating =
      reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      ) / reviews.length;

    await Course.findByIdAndUpdate(
      courseId,
      {
        averageRating:
          Number(
            averageRating.toFixed(
              1
            )
          ),
        totalRatings:
          reviews.length,
      }
    );

    return res.status(201).json({
      success: true,
      message:
        "Review added successfully",
    });
  } catch (error) {
    console.log(
      "Add review error:",
      error
    );

    return res.status(500).json({
      errors:
        "Error adding review",
    });
  }
};

export const getCourseReviews =
  async (req, res) => {
    try {
      const { courseId } =
        req.params;

      const reviews =
        await Review.find({
          courseId,
        })
          .populate(
            "userId",
            "firstName lastName"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      console.log(
        "Get reviews error:",
        error
      );

      return res.status(500).json({
        errors:
          "Error fetching reviews",
      });
    }
    };
  
    export const deleteReview = async (
  req,
  res
) => {
  try {
    const { userId } = req;
    const { reviewId } =
      req.params;

    const review =
      await Review.findOneAndDelete({
        _id: reviewId,
        userId,
      });

    if (!review) {
      return res.status(404).json({
        errors: "Review not found",
      });
    }

    const reviews =
      await Review.find({
        courseId:
          review.courseId,
      });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce(
            (
              sum,
              review
            ) =>
              sum +
              review.rating,
            0
          ) /
          reviews.length
        : 0;

    await Course.findByIdAndUpdate(
      review.courseId,
      {
        averageRating:
          Number(
            averageRating.toFixed(
              1
            )
          ),
        totalRatings:
          reviews.length,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Review deleted successfully",
    });
  } catch (error) {
    console.log(
      "Delete review error:",
      error
    );

    return res.status(500).json({
      errors:
        "Error deleting review",
    });
  }
    };

export const searchCourses = async (
  req,
  res
) => {
  try {
    const {
      q = "",
      page = 1,
      limit = 10,
    } = req.query;

    if (!q.trim()) {
      return res.status(400).json({
        success: false,
        errors:
          "Search query is required",
      });
    }

    const searchQuery = {
      $or: [
        {
          title: {
            $regex: q,
            $options: "i",
          },
        },
        {
          description: {
            $regex: q,
            $options: "i",
          },
        },
        {
          instructor: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    };

    const skip =
      (Number(page) - 1) *
      Number(limit);

    const courses =
      await Course.find(
        searchQuery
      )
        .sort({
          averageRating: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(
          Number(limit)
        );

    const totalCourses =
      await Course.countDocuments(
        searchQuery
      );

    return res.status(200).json({
      success: true,
      query: q,
      count:
        courses.length,
      currentPage:
        Number(page),
      totalPages:
        Math.ceil(
          totalCourses /
            Number(limit)
        ),
      totalCourses,
      courses,
    });
  } catch (error) {
    console.log(
      "Search courses error:",
      error
    );

    return res.status(500).json({
      success: false,
      errors:
        "Error searching courses",
    });
  }
};