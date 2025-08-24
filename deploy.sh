#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful! Deploying to S3..."
    
    # Deploy to S3
    aws s3 sync build/ s3://$S3_BUCKET --delete
    
    if [ $? -eq 0 ]; then
        echo "Deployment successful!"
        
        # Invalidate CloudFront cache if distribution ID is set
        if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
            echo "Invalidating CloudFront cache..."
            aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
        fi
        
        echo "Your app is now live at: http://monkmaze-s3.s3-website-ap-south-1.amazonaws.com"
    else
        echo "Deployment failed!"
        exit 1
    fi
else
    echo "Build failed!"
    exit 1
fi
