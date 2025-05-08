import {gql} from "@apollo/client";

export const ContactsPageQuery = gql`
    query ContactsPage {
        contactsPage {
            documentId
            Title
            Description
            Maps {
                url
            }
            locale
        }
    }`

export const ContactsPageFormQuery = gql`
    query ContactsPage {
        contactsPage {
            documentId
            locale
            Form {
                Title
                Description
            }
        }
    }`