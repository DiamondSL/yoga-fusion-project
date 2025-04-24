import {gql} from "@apollo/client";

export const teachersQuery = gql`
    query teachers {
        teachers {
            documentId
            Active
            Name
            Disciplines {
                Experience
                Active
                Name
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
            Name
            Photo {
                url
                width
                height
                alternativeText
            }
            Disciplines {
                Experience
                Active
                Name
            }
            Description
            Rating
        }
    }`

