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
            bookings {
                documentId
                session {
                    documentId
                    Date
                    Name
                }
            }
            membership {
                startDate
                endDate
                Activated
                Amount
                abonement {
                    Name {
                        Title
                    }
                }
            }
        }
    }`
