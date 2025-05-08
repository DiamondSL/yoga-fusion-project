import {gql} from "@apollo/client";

export const abonementsQuery = gql`
    query Abonements {
        abonements {
            documentId
            Type
            Name {
                Title
                Shape {
                    url
                    width
                    height
                    alternativeText
                }
            }
            Trainings_amount
            Description
            Price {
                Amount
                Shape {
                    height
                    width
                    url
                    alternativeText
                }
            }
           }
    }`

export const abonementQuery = gql`
    query Abonement ($abonementId: ID!) {
        abonement (documentId: $abonementId) {
            documentId
            Type
            Name {
                Title
                Shape {
                    url
                    width
                    height
                    alternativeText
                }
            }
            Description
            Trainings_amount
            Price {
                Amount
                Shape {
                    height
                    width
                    url
                    alternativeText
                }
            }
        }
    }`
