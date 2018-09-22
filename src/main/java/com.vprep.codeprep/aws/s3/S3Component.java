/*
package com.vprep.codeprep.aws.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.*;

*/
/**
 * This class maps to the s3 bucket for the application.
 * Will be used for uploading and reading files fro s3 buckets
 *//*

@Component
public class S3Component {

    @Autowired
    AmazonS3 amazonS3;

    @Value("${codeprep.solution.file.bucket}")
    private String BUCKET_NAME;
    @Value("${codeprep.title.file.bucket}")
    private String TITLE_BUCKET;
    private static final String COMMON_URL = "https://s3.amazonaws.com/";
    private static final Logger LOGGER = Logger.getLogger(S3Component.class);
    private static final String SUFFIX = "/";
    private final String PROD_NS_PATH = "com.upsnap.dmp.campaigns.creatives/campaign_ns";

    */
/**
     * This method is used to upload a file to a default bucket, set as a static string in this class.
     *
     * @param file
     * @param inputFile
     * @return File uploaded detail as pojo
     * @throws Exception
     *//*

    public CreativeFileVO uploadFile(File file, String inputFile, String extension) throws Exception {
        // create bucket - name must be unique for all S3 users
        LOGGER.info("bucket name: " + BUCKET_NAME + ", file:" + file);
        amazonS3.createBucket(BUCKET_NAME);
        amazonS3.getBucketLocation(BUCKET_NAME);
        LOGGER.info("bucket locations:::::" + amazonS3.getUrl(BUCKET_NAME, inputFile).toURI());
        S3OperationUtil.createFolder(BUCKET_NAME, FOLDER, amazonS3);
        // upload file to folder and set it to public
        String fileName = FOLDER + SUFFIX + inputFile + extension;
        amazonS3.putObject(new PutObjectRequest(BUCKET_NAME, fileName,
                file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        CreativeFileVO creativeFileVO = new CreativeFileVO();
        creativeFileVO.setName(inputFile + extension);
        creativeFileVO.setUrl(COMMON_URL + BUCKET_NAME + SUFFIX + FOLDER + SUFFIX + inputFile + extension);
        return creativeFileVO;
    }

    public CreativeFileVO uploadFile(File file, String inputFile) throws Exception {
        File imageFile = PdfUtil.convertPdfToImage(file, inputFile);
        uploadFile(imageFile, inputFile, ".png");
        return uploadFile(file, inputFile, PDF);
    }


    */
/**
     * This method is used to upload a file to a default bucket, set as a static string in this class.
     *
     * @param file
     * @param inputFile
     * @return File uploaded detail as pojo
     * @throws Exception
     *//*

    public CreativeFileVO getFileDetailsForUploadedFile(String bucketName, String folder, File file, String inputFile) throws Exception {
        if (bucketName == null || bucketName.isEmpty())
            bucketName = BUCKET_NAME;
        // create bucket - name must be unique for all S3 users
        LOGGER.info("bucket name: " + bucketName + ", file:" + file);
        amazonS3.createBucket(bucketName);
        amazonS3.getBucketLocation(bucketName);
        LOGGER.info("bucket locations:::::" + amazonS3.getUrl(bucketName, inputFile).toURI());
        S3OperationUtil.createFolder(bucketName, folder, amazonS3);
        // upload file to folder and set it to public
        String fileName = folder + SUFFIX + inputFile;
        amazonS3.putObject(new PutObjectRequest(bucketName, fileName,
                file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        CreativeFileVO creativeFileVO = new CreativeFileVO();
        creativeFileVO.setName(inputFile + PDF);
        creativeFileVO.setUrl(fileName);
        return creativeFileVO;
    }

    */
/**
     * This method is used to upload a file with passed date key as name. This is uploaded on a default bucket.
     *
     * @param file
     * @param key
     * @return Path of uploaded file.
     * @throws Exception
     *//*

    public String uploadReport(File file, String key) throws Exception {
        return uploadFile(BUCKET_NAME, FOLDER_NS, DEV_NS_PATH, file, key);
    }

    */
/**
     * This is a more generic method for uploading a file to s3 bucket mentioned as a parameter
     *
     * @param bucketName
     * @param folderName
     * @param path
     * @param file
     * @param key
     * @return path of the file where it is stored and can be accessed
     *//*

    public String uploadFile(String bucketName, String folderName, String path, File file, String key) {
        amazonS3.createBucket(bucketName);
        amazonS3.getBucketLocation(bucketName);
        com.vprep.codeprep.aws.s3.S3OperationUtil.createFolder(bucketName, folderName, amazonS3);
        amazonS3.putObject(new PutObjectRequest(path, key, file).withCannedAcl(CannedAccessControlList.PublicRead));
        return COMMON_URL + bucketName + SUFFIX + key;
    }

    */
/**
     * This is a more generic method for uploading a file to s3 bucket mentioned as a parameter
     *
     * @param bucketName
     * @param folderName
     * @param file
     * @param key
     * @return path of the file where it is stored and can be accessed
     * @throws Exception
     *//*

    public String uploadFile(String bucketName, String folderName, File file, String key) throws Exception {
        try {
            String path = bucketName + "/" + folderName;
            amazonS3.createBucket(bucketName);
            S3OperationUtil.createFolder(bucketName, folderName, amazonS3);
            amazonS3.putObject(new PutObjectRequest(path, key, file).withCannedAcl(CannedAccessControlList.PublicRead));
            return COMMON_URL + bucketName + SUFFIX + folderName + SUFFIX + key;
        } catch (Exception e) {
            LOGGER.error("Error in uploading file: " + e);
            return null;
        }
    }

    */
/**
     * This method returns the s3 Url of the file name passed as a parameter.
     *
     * @param id
     * @return map having back and front url of the campaign file name which is passed as param
     * @throws Exception
     *//*

   */
/* public Map<String, String> getS3Url(String id) throws Exception {
        Map<String, String> map = new HashMap<>();
        map.put("front", amazonS3.getUrl(BUCKET_NAME, frontKey).toURI().toString());
        map.put("back", amazonS3.getUrl(BUCKET_NAME, backKey).toURI().toString());
        return map;
    }*//*


    */
/**
     * This method returns the list of campaign Ids with their respective counts of mails sent
     * by reading the printer report from the file of current date in s3 bucket
     *
     * @return List of campaign Ids with their respective counts of mails sent
     * @throws Exception
     *//*

   */
/* public List<PrinterDetailVO> readPrinterFile() throws Exception {
        List<PrinterDetailVO> printerDetailVOList = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        String dateKey = DateTimeUtils.fetchDateStringFromDate(cal.getTime(), ApplicationConstant.MMDDYYYY);
        String key = "printer_" + dateKey + ".csv";
        S3Object s3Object = amazonS3.getObject(
                new GetObjectRequest(TITLE_BUCKET, key));
        if (s3Object != null) {
            InputStream inputStream = s3Object.getObjectContent();
            BufferedReader br = null;
            String line = "";
            String csvDelimiter = ",";
            try {
                br = new BufferedReader(new InputStreamReader(inputStream));
                while ((line = br.readLine()) != null) {

                    // use comma as separator
                    String[] campaign = line.split(csvDelimiter);
                    if (campaign[0] != null && !campaign[0].toString().equals("c_id")
                            && campaign[1] != null && !campaign[1].toString().equals("count")) {
                        PrinterDetailVO printerDetailVO = new PrinterDetailVO();
                        printerDetailVO.setCampaignId(Long.valueOf(campaign[0]));
                        printerDetailVO.setCount(Integer.valueOf(campaign[1]));
                        printerDetailVOList.add(printerDetailVO);
                    }
                }

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (br != null) {
                    try {
                        br.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return printerDetailVOList;
    }*//*


    */
/**
     * This is a test method.
     *
     * @param dateKey
     * @return list of {@link PrinterDetailVO} objecys
     * @throws Exception
     *//*

   */
/* public List<PrinterDetailVO> testReadPrinterFile(String dateKey) throws Exception {
        List<PrinterDetailVO> printerDetailVOList = new ArrayList<>();
        String key = "printer_" + dateKey + ".csv";
        S3Object s3Object = amazonS3.getObject(
                new GetObjectRequest(TITLE_BUCKET, key));
        if (s3Object != null) {
            InputStream inputStream = s3Object.getObjectContent();
            BufferedReader br = null;
            String line = "";
            String cvsSplitBy = ",";

            try {

                br = new BufferedReader(new InputStreamReader(inputStream));
                while ((line = br.readLine()) != null) {

                    // use comma as separator
                    String[] campaign = line.split(cvsSplitBy);
                    LOGGER.debug("capaign[]: " + campaign.toString());
                    if (campaign[0] != null && !campaign[0].toString().equals("c_id")
                            && campaign[1] != null && !campaign[1].toString().equals("count")) {
                        PrinterDetailVO printerDetailVO = new PrinterDetailVO();
                        System.out.println("set campaignId: " + Long.valueOf(campaign[0]));
                        printerDetailVO.setCampaignId(Long.valueOf(campaign[0]));
                        System.out.println("set campaign count: " + Integer.valueOf(campaign[1]));
                        printerDetailVO.setCount(Integer.valueOf(campaign[1]));
                        printerDetailVOList.add(printerDetailVO);
                    }


                }

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (br != null) {
                    try {
                        br.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return printerDetailVOList;
    }*//*


    public Map<Long, Integer> readSendReportFile(String key, boolean callFlag) {

        Map<Long, Integer> sendMap = new HashMap<>();
        amazonS3.createBucket(BUCKET_NAME);
        amazonS3.getBucketLocation(BUCKET_NAME);
        S3Object s3Object = null;
        try {
            if (isEnvironmentDev) {
                s3Object = amazonS3.getObject(
                        new GetObjectRequest(DEV_NS_PATH, key));
            } else {
                s3Object = amazonS3.getObject(
                        new GetObjectRequest(PROD_NS_PATH, key));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        if (s3Object != null) {
            InputStream inputStream = s3Object.getObjectContent();
            BufferedReader br = null;
            String line = "";
            String cvsSplitBy = ",";

            try {

                br = new BufferedReader(new InputStreamReader(inputStream));
                while ((line = br.readLine()) != null) {

                    // use comma as separator
                    String[] campaign = line.split(cvsSplitBy);
                    LOGGER.debug("capaignId[]: " + campaign.toString());
                    if (callFlag) {
                        if (campaign[4] != null && !campaign[4].toString().equals("CreativeID")) {
                            if (sendMap.get(Long.valueOf(campaign[4].toString())) == null) {
                                sendMap.put(Long.valueOf(campaign[4].toString()), 1);
                            } else {
                                Integer count = sendMap.get(Long.valueOf(campaign[4].toString()));
                                sendMap.put(Long.valueOf(campaign[4].toString()), count + 1);
                            }
                        }
                    } else {
                        if (campaign[1] != null && campaign[1].matches("[0-9]+")) {
                            if (sendMap.get(Long.valueOf(campaign[1].toString())) == null) {
                                sendMap.put(Long.valueOf(campaign[1].toString()), 1);
                            } else {
                                Integer count = sendMap.get(Long.valueOf(campaign[1].toString()));
                                sendMap.put(Long.valueOf(campaign[1].toString()), count + 1);
                            }
                        }
                    }
                }

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (br != null) {
                    try {
                        br.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return sendMap;
    }

  */
/*  public List<CampaignAnalytics> readUserSendReportFile(String key, Date sentDate) {

        List<CampaignAnalytics> campaignAnalyticsList = new ArrayList<>();
        amazonS3.createBucket(BUCKET_NAME);
        amazonS3.getBucketLocation(BUCKET_NAME);
        S3Object s3Object = null;
        try {
            if (isEnvironmentDev) {
                s3Object = amazonS3.getObject(
                        new GetObjectRequest(DEV_NS_PATH, key));
            } else {
                s3Object = amazonS3.getObject(
                        new GetObjectRequest(PROD_NS_PATH, key));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        if (s3Object != null) {
            InputStream inputStream = s3Object.getObjectContent();
            BufferedReader br = null;
            String line = "";
            String cvsSplitBy = ",";

            try {

                br = new BufferedReader(new InputStreamReader(inputStream));
                while ((line = br.readLine()) != null) {
                    CampaignAnalytics campaignAnalytics = new CampaignAnalytics();
                    campaignAnalytics.setSentDate(sentDate);
                    // use comma as separator
                    String[] campaign = line.split(cvsSplitBy);
                    LOGGER.debug("capaignId[]: " + campaign.toString());
                    if(campaign.length >= 1) {
                        if (campaign[0] != null && !campaign[0].toString().equals("userid")) {
                            campaignAnalytics.setUserId(campaign[0].toString());
                        }
                    }
                    if(campaign.length >= 2) {
                        if (campaign[1] != null && !campaign[1].toString().equals("campaignID")) {
                            campaignAnalytics.setCampaignId(Long.valueOf(campaign[1].toString()));
                        }
                    }
                    if(campaign.length >= 6){
                        if (campaign[5] != null && !campaign[5].toString().equals("PromoCode")){
                            campaignAnalytics.setPromoCode(campaign[5].toString());
                        }
                    }

                    campaignAnalyticsList.add(campaignAnalytics);
                }

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (br != null) {
                    try {
                        br.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return campaignAnalyticsList;
    }

    public List<UsedPromoCode> readPromoCodeFile(String key, Date sentDate) {

        List<UsedPromoCode> usedPromoCodeList = new ArrayList<>();
        amazonS3.createBucket(BUCKET_NAME);
        amazonS3.getBucketLocation(BUCKET_NAME);
        S3Object s3Object = null;
        try {
            if (isEnvironmentDev) {
                s3Object = amazonS3.getObject(
                        new GetObjectRequest(DEV_NS_PATH, key));
            } else {
                s3Object = amazonS3.getObject(
                        new GetObjectRequest(PROD_NS_PATH, key));
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        if (s3Object != null) {
            InputStream inputStream = s3Object.getObjectContent();
            BufferedReader br = null;
            String line = "";
            String cvsSplitBy = ",";

            try {

                br = new BufferedReader(new InputStreamReader(inputStream));
                while ((line = br.readLine()) != null) {
                    UsedPromoCode usedPromoCode = new UsedPromoCode();
                    usedPromoCode.setReceivedDate(sentDate);
                    // use comma as separator
                    String[] campaign = line.split(cvsSplitBy);
                    LOGGER.debug("capaignId[]: " + campaign.toString());
                    if(campaign.length >= 1) {
                        if (campaign[0] != null && !campaign[0].toString().equals("userid")) {
                            usedPromoCode.setUsedCode(campaign[0].toString().trim());
                        }
                    }

                    usedPromoCodeList.add(usedPromoCode);
                }

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (br != null) {
                    try {
                        br.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return usedPromoCodeList;
    }*//*




*/
/*
    public String getContentFromFile(String bucketName, String phoneListFileLocation) {
        S3Object s3Object = amazonS3.getObject(
                new GetObjectRequest(bucketName, phoneListFileLocation));
        String line = "";
        String lineTmp = "";
        if (s3Object != null) {
            InputStream inputStream = s3Object.getObjectContent();
            BufferedReader br = null;
            try {
                br = new BufferedReader(new InputStreamReader(inputStream));
                while ((lineTmp = br.readLine()) != null) {
                    line += lineTmp.trim();
                }
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (br != null) {
                    try {
                        br.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return line;
    }*//*


    public Boolean uploadLocalFileToNewFileName(String bucket, String folder, String fileKey, String targetKey) throws Exception {
        File file = new File(fileKey);
        if (file != null) {
            uploadFile(bucket, folder, file, targetKey);
            return true;
        } else {
            LOGGER.warn("No file by file name " + fileKey);
            return false;
        }
    }
}
*/
