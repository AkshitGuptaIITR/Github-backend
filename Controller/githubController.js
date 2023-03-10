const catchAsync = require("../utils/catchAsync");
const { Octokit } = require("@octokit/rest");
const AppError = require("../utils/appError");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

exports.getRepsitories = catchAsync(async (req, res, next) => {
  const { userName } = req.params;

  if (!userName) return new AppError("Please provide user name", 400);

  const bio = await octokit.request(`GET /users/${userName}`, {});
  const repo = await octokit.request(`GET /users/${userName}/repos`, {});

  res.status(200).json({ bio: bio.data, repo: repo.data });
});
