import {gql} from "@apollo/client";

export const usersQuery = gql`
    query {
        usersPermissionsUsers {
            documentId
            username
            email
            socials {
                link
                social
                verified
            }
        }
    }
`;

export const userQuery = gql`
    query ($userId: ID!) {
        usersPermissionsUser(documentId: $userId) {
            instagram
            socials {
                social
                link
                verified
            }
            fullName
            email
        }
    }`
