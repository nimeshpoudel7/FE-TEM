import { CloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {  useState } from "react";
import Dropzone from "react-dropzone";

export default function DropzoneComponent({
  setAcceptedFiles,
  multiple,
  helperText,
  maxSize,
}) {
  const [preview, setPreview] = useState([]);
  const [rejectedFileList, setRejectedFileList] = useState([]);
  const singleUpload = !multiple && preview.length > 0;
  return (
    <Dropzone
      onDrop={(acceptedFiles, rejectedFiles) => {
          setAcceptedFiles(acceptedFiles);
          setRejectedFileList(rejectedFiles)

        acceptedFiles.forEach(file => {
          const filePreview = {
            link: URL.createObjectURL(file),
            fileType: file.type,
            fileName: file.name,
          };
          multiple
            ? setPreview(prev => [...prev, filePreview])
            : setPreview([filePreview]);
        });
      }}
      maxSize={maxSize ?? 5242880}
      multiple={!!multiple}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <Box {...getRootProps()} border="2px dashed #D1D5DB" >
            <input {...getInputProps()} />
            <VStack spacing={4}>
              {singleUpload ? (
                <>
                  <CloseButton
                    onClick={e => {
                      e.stopPropagation();
                      setPreview([]);
                      setAcceptedFiles([])
                    }}
                    alignSelf="flex-end"
                  />
                  <Image
                    src={preview[0].link}
                    width="90px"
                    height="90px"
                    objectFit="cover"
                  />
                  <Text flex={1} noOfLines={[1]}>
                    {preview[0].fileName}
                  </Text>
                </>
              ) : (
                <>
                  {/* <ImagePlaceholder /> */}
                  <Heading
                    fontSize={"14px"}
                    display="flex"
                    justifyContent={"center"}
                    gap={1}
                    padding={6}
                  >
                    <Text color="#14B8A6" display={"inline-block"}>
                      Upload {multiple ? "files" : "a file"},
                    </Text>
                    or click to select files
                  </Heading>
                  <Text color="gray.400">{helperText}</Text>
                </>
              )}
            </VStack>
          </Box>
          {(preview.length > 1 || rejectedFileList.length > 1) && (
            <Button
              mt={4}
              leftIcon={<CloseIcon width={3} height={3} />}
              colorScheme="purple"
              variant="ghost"
              onClick={e => {
                e.stopPropagation();
                setPreview([]);
                setRejectedFileList([]);
              }}
            >
              Remove All
            </Button>
          )}

          <SimpleGrid columns={1} spacing={2} mt={multiple ? 2 : 0}>
            {rejectedFileList.map((rejectedItem, index) => {
              return (
                <GridItem key={index}>
                  <Alert status="error">
                    <AlertIcon />
                    <Text as="b" mr={2}>
                      {rejectedItem.file.name}{" "}
                    </Text>
                    <Text mr={2}>File not uploaded</Text>
                    <Text flex={1}>
                      {rejectedItem.errors[0].code == "file-too-large"
                        ? `File is large than ${
                            maxSize ? maxSize * 0.000001 + " MB" : "5MB"
                          }`
                        : rejectedItem.errors[0].message}
                    </Text>
                    <CloseButton
                      onClick={e => {
                        e.stopPropagation();
                        setRejectedFileList(prev => {
                          return prev.filter((each, i) => i !== index);
                        });
                      }}
                      justifySelf="flex-end"
                    />
                  </Alert>
                </GridItem>
              );
            })}
          </SimpleGrid>
        </section>
      )}
    </Dropzone>
  );
}
