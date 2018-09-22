package com.vprep.codeprep.aws.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectSummary;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

/**
 * This class is a utils method for s3 operations.
 */
public class S3OperationUtil {
    private static final String SUFFIX = "/";

    /**
     * This method creates a folder in bucket
     *
     * @param bucketName
     * @param folderName
     * @param client
     */
    public static void createFolder(String bucketName, String folderName, AmazonS3 client) {
        // create meta-data for your folder and set content-length to 0
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(0);

        // create empty content
        InputStream emptyContent = new ByteArrayInputStream(new byte[0]);

        // create a PutObjectRequest passing the folder name suffixed by /
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName,
                folderName + SUFFIX, emptyContent, metadata);

        // send request to S3 to create folder
        client.putObject(putObjectRequest);
    }

    /**
     *
     * @param bucketName
     * @param folderName
     * @param client
     */
    public static void deleteFolder(String bucketName, String folderName, AmazonS3 client) {
        List fileList =
                client.listObjects(bucketName, folderName).getObjectSummaries();
        for (Object file : fileList) {
            S3ObjectSummary s3File = (S3ObjectSummary) file;
            client.deleteObject(bucketName, s3File.getKey());
        }
        client.deleteObject(bucketName, folderName);
    }
}
