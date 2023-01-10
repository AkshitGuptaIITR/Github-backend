const catchAsync = require("../utils/catchAsync");
const { Octokit } = require("@octokit/rest");
const AppError = require("../utils/appError");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

exports.getRepsitories = catchAsync(async (req, res, next) => {
  const { userName } = req.params;

  if (!userName) return new AppError("Please provide user name", 400);

  const response = await octokit.request(`GET /users/${userName}/repos`, {
    per_page: 1,
  });

  res.status(200).json({
    status: "success",
    data: response.data,
  });
});
