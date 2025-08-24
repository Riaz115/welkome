# 🚀 Automatic Deployment Guide

## Overview
This project is configured for automatic deployment to AWS S3 using GitHub Actions. Every time you push code to the main branch, it will automatically build and deploy your React app.

## 🛠️ Prerequisites

### 1. AWS Account Setup
- AWS Account with appropriate permissions
- IAM user with S3 and CloudFront access
- S3 bucket for hosting

### 2. Required AWS Services
- **S3 Bucket**: For static website hosting
- **CloudFront** (Optional): For CDN and custom domain
- **IAM User**: For GitHub Actions authentication

## 📋 Step-by-Step Setup

### Step 1: Create S3 Bucket
1. Go to AWS S3 Console
2. Create a new bucket with your desired name (e.g., `monkmaze-s3`)
3. Choose your preferred region
4. **Important**: Uncheck "Block all public access" for static website hosting
5. Enable static website hosting in bucket properties

### Step 2: Configure S3 Bucket Policy
Apply the bucket policy from `aws-s3-policy.json`:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::monkmaze-s3/*"
        }
    ]
}
```

### Step 3: Create IAM User
1. Go to AWS IAM Console
2. Create a new user (e.g., `github-actions-user`)
3. Attach the following policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
                            "Resource": [
                    "arn:aws:s3:::monkmaze-s3",
                    "arn:aws:s3:::monkmaze-s3/*"
                ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "*"
        }
    ]
}
```

### Step 4: Get AWS Credentials
1. Create access keys for the IAM user
2. Note down:
   - Access Key ID
   - Secret Access Key
   - AWS Region
   - S3 Bucket Name

### Step 5: Configure GitHub Secrets
1. Go to your GitHub repository
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Add the following secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `AWS_REGION`: Your AWS region (e.g., ap-south-1)
   - `S3_BUCKET`: Your S3 bucket name
   - `CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID (optional)

## 🔄 How It Works

1. **Push Code**: When you push to main/master branch
2. **GitHub Actions**: Automatically triggers the workflow
3. **Build**: Installs dependencies and builds the React app
4. **Deploy**: Syncs build files to S3 bucket
5. **Cache Invalidation**: Clears CloudFront cache (if configured)

## 🌐 Accessing Your Website

### S3 Website URL
```
http://monkmaze-s3.s3-website-ap-south-1.amazonaws.com
```

### Custom Domain (Optional)
1. Set up CloudFront distribution
2. Point your domain to CloudFront
3. Configure SSL certificate

## 🚨 Troubleshooting

### Common Issues
1. **Build Failures**: Check Node.js version and dependencies
2. **Deployment Errors**: Verify AWS credentials and permissions
3. **S3 Access Denied**: Check bucket policy and IAM permissions

### Manual Deployment
If needed, you can deploy manually:
```bash
# Set environment variables
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
export AWS_REGION=ap-south-1
export S3_BUCKET=monkmaze-s3

# Run deployment script
chmod +x deploy.sh
./deploy.sh
```

## 📝 Environment Variables

Create a `.env` file locally (don't commit to git):
```bash
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=ap-south-1
S3_BUCKET=monkmaze-s3
CLOUDFRONT_DISTRIBUTION_ID=your_distribution_id_here
```

## 🔒 Security Notes

- Never commit AWS credentials to git
- Use IAM roles with minimal required permissions
- Regularly rotate access keys
- Monitor AWS CloudTrail for security

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Verify AWS credentials and permissions
3. Ensure S3 bucket is properly configured
4. Check CloudFront distribution (if using)
