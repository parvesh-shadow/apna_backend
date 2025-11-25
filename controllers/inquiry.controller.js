const InquiryModel = require("../model/Inquiry.model");

exports.submitInquiryForm = async (req, res) => {
  try {
    const { fullName, mobile, email, source, projectId } = req.body;

    if (!fullName || !mobile || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Save to database
    const newEntry = await InquiryModel.create({
      fullName,
      mobile,
      email,
      source,
      projectId
    });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully.",
      data: newEntry,
    });
  } catch (error) {
    // Handle duplicate or validation errors
    res.status(500).json({
      success: false,
      message: "Error submitting form.",
      error: error.message,
    });
  }
};

exports.getInquiry = async (req, res) => {
  try {
    const allInuiry = await InquiryModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Inquiry fetched successfully",
      inquiry: allInuiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getting inquiry",
      error,
    });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const id = req.params.id;
    if(!id){
      return res.status(401).json({
        success:false,
        message:"Id is required"
      })
    }
    await InquiryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleting inquiry",
      error,
    });
  }
};
