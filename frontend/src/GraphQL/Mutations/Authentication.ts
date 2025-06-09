import {gql} from "@apollo/client";

export const registerUserMutation = gql`
    mutation RegisterUser($input: UsersPermissionsRegisterInput!) {
        register(input: $input) {
            jwt
            user {
                username
                email
                confirmed
            }
        }
    }
`;

export const updateUserMutation = gql`
    mutation ($updateUsersPermissionsUserId: ID!, $data: UsersPermissionsUserInput!) {
        updateUsersPermissionsUser(id: $updateUsersPermissionsUserId, data: $data) {
            data {
                fullName
                instagram
            }
        }
    }`


export const loginUserMutation = gql`
    mutation login($input: UsersPermissionsLoginInput!) {
        login(input: $input) {
            jwt
            user {
                id
                username
                documentId
            }
        }
    }`