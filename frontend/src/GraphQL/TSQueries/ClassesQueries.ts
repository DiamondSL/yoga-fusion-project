

import {gql} from "@apollo/client";

export const classesQuery = gql`
    query classes {
        classes {
            Name
            documentId
            Duration
            Intensity
            Information
            disciplines {
                Name
                documentId
                Icon {
                    url
                    width
                    height
                }
            }
            teachers {
                Name
                Rating
            }
            Photo {
                url
                width
                height
                alternativeText
            }
        }
    }`

export const classQuery = gql`
    query class ($classId: ID!) {
        class (documentId: $classId) {
            Name
            documentId
            Duration
            Intensity
            Information
            disciplines {
                Name
                documentId
                Icon {
                    url
                    width
                    height
                }
            }
            Description
            teachers {
                Name
                Rating
            }
            Photo {
                url
                width
                height
                alternativeText
            }
        }
    }`
