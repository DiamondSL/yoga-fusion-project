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
    mutation ($id: ID!, $info: UsersPermissionsUserInput!) {
        updateUsersPermissionsUser(id: $id, data: $info) {
            data {
                fullName
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
            }
        }
    }`