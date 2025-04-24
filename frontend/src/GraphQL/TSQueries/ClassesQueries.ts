

import {gql} from "@apollo/client";

export const classesQuery = gql`
    query classes {
        classes {
            Name
            documentId
            Time {
                Beginning
                Minutes
            }
            Intensity
            Information
            Discipline {
                Name
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
            Time {
                Beginning
                Minutes
            }
            Intensity
            Information
            Discipline {
                Name
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
