import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudniary } from "../utils/cloudniary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // taking data from user
    const { username, email, password, fullname } = req.body;

    // checking the input fields are empty or not
    if (
        [fullname, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // user or email already exist or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // uploading avatar and cover image on cloudniary
    const avatarLocalPath = req.files?.avatar[0]?.path;

    let coverImageLocalPath ;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudniary(avatarLocalPath);

    const coverImage = await uploadOnCloudniary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar is required");
    }

    // creating user
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    // removing password and refresh token from user object
    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken")
    
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

    // sending response
    return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));

});

export { registerUser };
