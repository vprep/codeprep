package com.vprep.codeprep.services;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class AmazonClient {

    private AmazonS3 s3client;

    @Value("${amazonProperties.AWSAccessKeyId}")
    private String accessKey;
    @Value("${amazonProperties.AWSSecretKey}")
    private String secretKey;
    @PostConstruct
    private void initializeAmazon() {


        BasicAWSCredentials awsCreds = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.AP_SOUTH_1)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
    }

    public AmazonS3 getS3client() {
        return s3client;
    }

    public AmazonClient setS3client(AmazonS3 s3client) {
        this.s3client = s3client;
        return this;
    }
}
