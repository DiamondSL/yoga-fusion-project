import {gql} from "@apollo/client";

export const LandingPageQuery = gql`
    query LandingPage($status: PublicationStatus, $locale: I18NLocaleCode) {
        landingPage(status: $status, locale: $locale) {
            documentId
            locale
            Section_One {
                id
                Title {
                    Placement
                    Title
                }
                Buttons {
                    Action
                    Text
                    Variant
                }
            }
            Section_Two {
                List_Description {
                    Description
                    Icon {
                        url
                        width
                        height
                    }
                }
                Title {
                    Placement
                    Title
                }
            }
            Section_Three {
                Button {
                    Action
                    Text
                    Variant
                }
                Description
                Photos {
                    url
                    width
                    height
                }
                Title {
                    title
                    motto
                }
            }
            Section_Four {
                Shape_Titles {
                    Shape {
                        url
                    }
                    Title
                }
                Title {
                    Placement
                    Title
                }
            }
            Section_Five {
                Button {
                    Action
                    Text
                    Variant
                }
                Title
            }
            Section_Six {
                Button {
                    Action
                    Text
                    Variant
                }
                Description
                Gallery {
                    url
                    height
                    width
                }
                Title {
                    Title
                    Placement
                }
            }
            Section_Seven {
                Placement
                Route {
                    Link
                    Title
                }
                Title
            }
            Section_Eight {
                Title {
                    Title
                    Placement
                }
                FAQ_elements {
                    Description
                    Title
                }
            }
        }
    }
`

