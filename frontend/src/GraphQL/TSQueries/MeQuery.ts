import {gql} from "@apollo/client";

export const meQuery = gql`
    query Me {
        me {
            id
            documentId
            username
            email
            confirmed
            blocked
        }
    }
`;

