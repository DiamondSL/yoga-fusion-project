import {gql} from "@apollo/client";

export const sessionsQuery = gql`
    query {
        sessions {
            documentId
            Name
            Date
            Duration
            teachers {
                Name
                documentId
            }
            bookings {
                documentId
                users_permissions_user {
                    documentId
                }
            }
            class {
                documentId
                Name
                Duration
                Intensity
                disciplines {
                    Name
                }
            }
            Room
            Places

        }
    }`

export const sessionQuery = gql`
    query ($sessionId: ID!) {
        session (documentId: $sessionId) {
            documentId
            Places
            Name
            Date
            class {
                documentId
                Name
                Duration
            }
            Duration
            bookings {
                documentId
                users_permissions_user {
                    documentId
                    username
                }
            }

        }
    }`
