import {gql} from "@apollo/client";

export const socialsQuery = gql`
    query socialLinks  {
        global {
            documentId
            Socials {
                url
                Icon {
                    url
                    alternativeText
                    height
                    width
                }
                Show
            }
        }
    }`