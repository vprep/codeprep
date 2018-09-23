package com.vprep.codeprep.aws.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.vprep.codeprep.services.AmazonClient;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;



@Component
public class S3Component {

    @Autowired
    AmazonClient amazonClient;



    public String readFromS3(String bucketName, String key) throws IOException {
        S3Object s3object = amazonClient.getS3client().getObject(new GetObjectRequest(
                bucketName, key));
        System.out.println(s3object.getObjectMetadata().getContentType());
        System.out.println(s3object.getObjectMetadata().getContentLength());


        try (InputStream is = s3object.getObjectContent()) {
            return StreamUtils.copyToString(is, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }

        /*BufferedReader reader = new BufferedReader(new InputStreamReader(s3object.getObjectContent()));
        String line;
        while((line = reader.readLine()) != null) {
            System.out.println(line);
            line+=line;
        }*/
    }



















}
