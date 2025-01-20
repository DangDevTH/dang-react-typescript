import { gql, useMutation } from "@apollo/client";

const updateProfileDocument = gql`
  mutation UpdateUser(
    $updateUserInput: UpdateUserInput!
    $uploadUserImagesInputDto: UploadUserImagesInputDto!
  ) {
    updateUser(
      updateUserInput: $updateUserInput
      uploadUserImagesInputDto: $uploadUserImagesInputDto
    ) {
      id
      name
      username
      profileImage
      backgroundImage
    }
  }
`;

const useUpdateProfile = () => {
  return useMutation(updateProfileDocument);
};

export { useUpdateProfile };
