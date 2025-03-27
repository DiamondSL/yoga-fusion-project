import {gql} from "@apollo/client";


export const SectionOneContentQuery = gql`
    query SectionOne($status: PublicationStatus) {
        landingPage(status: $status) {
            Section_One {
                id
                Title {
                    Title
                    Placement
                }
                Buttons {
                    Text
                    Variant
                }
            }
        }
    }
`

export const SectionTwoContentQuery = gql`
    query SectionTwo($status: PublicationStatus) {
        landingPage(status: $status) {
            Section_Two {
                id
                Title {
                    Title
                    Placement
                }
                ListDescription {
                    Description
                    Icon {
                        url
                        height
                        width
                    }
                }
            }
        }
    }
`

export const LandingPageQuery = gql`
    query LandingPage($status: PublicationStatus) {
        landingPage(status: $status) {
            Section_One {
                id
                Title {
                    Title
                    Placement
                }
                Buttons {
                    Variant
                    Text
                }
            }
            Section_Two {
                id
                Title {
                    Title
                    Placement
                }
                ListDescription {
                    Description
                    Icon {
                        url
                        height
                        width
                    }
                }
            }
            Section_Three {
                id
                Title {
                    body
                    title
                }
                Description
                Button {
                    Text
                    Variant
                }
            }
            Section_Four {
                id
                Title {
                    Title
                    Placement
                }
                Shape_Titles {
                    Title
                    Shape {
                        url
                        height
                        width
                    }
                }
            }
            Section_Five {
                id
                Title
                Button {
                    Variant
                    Text
                }
            }
            Section_Six {
                id
                Button {
                    Text
                    Variant
                }
                Title {
                    Title
                    Placement
                }
                Description
                Gallery {
                    width
                    height
                    url
                }
            }
            Section_Seven {
                id
                Title
                Placement
                Route {
                    Title
                    Link
                }
            }
            Section_Eight {
                id
                Title {
                    Title
                    Placement
                }
                FAQ_elements {
                    Title
                    Description
                }
            }
        }
    }
`