import {gql} from "@apollo/client";

export const teachersQuery = gql`
    query teachers {
        teachers {
            documentId
            Active
            Top
            Name
            disciplines {
                Name
                documentId
                Icon {
                    height
                    width
                    url
                }
            }
            Photo {
                url
                width
                height
                alternativeText
            }
            Rating
        }
    }`


export const teacherQuery = gql`
    query teacher($teacherId: ID!) {
        teacher(documentId: $teacherId) {
            Active
            Top
            Name
            Photo {
                url
                width
                height
                alternativeText
            }
            disciplines {
                Name
                documentId
                Icon {
                    height
                    width
                    url
                }
            }
            Description
            Rating
        }
    }`

