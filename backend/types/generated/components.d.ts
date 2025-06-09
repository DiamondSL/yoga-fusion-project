import type { Schema, Struct } from '@strapi/strapi';

export interface LandingSectionsSectionEight extends Struct.ComponentSchema {
  collectionName: 'components_landing_sections_section_eights';
  info: {
    description: '';
    displayName: 'Section Eight';
  };
  attributes: {
    FAQ_elements: Schema.Attribute.Component<
      'section.detailed-description',
      true
    > &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    Title: Schema.Attribute.Component<'section.title', false> &
      Schema.Attribute.Required;
  };
}

export interface LandingSectionsSectionFive extends Struct.ComponentSchema {
  collectionName: 'components_landing_sections_section_fives';
  info: {
    description: '';
    displayName: 'Section Five';
  };
  attributes: {
    Button: Schema.Attribute.Component<'section.button', false>;
    Title: Schema.Attribute.Blocks;
  };
}

export interface LandingSectionsSectionFour extends Struct.ComponentSchema {
  collectionName: 'components_landing_sections_section_fours';
  info: {
    displayName: 'Section Four';
  };
  attributes: {
    Shape_Titles: Schema.Attribute.Component<'section.shape-title', true> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.Component<'section.title', false> &
      Schema.Attribute.Required;
  };
}

export interface LandingSectionsSectionOne extends Struct.ComponentSchema {
  collectionName: 'components_landing_sections_section_ones';
  info: {
    displayName: 'Section One';
  };
  attributes: {
    Buttons: Schema.Attribute.Component<'section.button', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
        },
        number
      >;
    Title: Schema.Attribute.Component<'section.title', true> &
      Schema.Attribute.Required;
  };
}

export interface LandingSectionsSectionSeven extends Struct.ComponentSchema {
  collectionName: 'components_landing_sections_section_sevens';
  info: {
    displayName: 'Section Seven';
  };
  attributes: {
    Placement: Schema.Attribute.Blocks;
    Route: Schema.Attribute.Component<'section.hidden-link', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LandingSectionsSectionSix extends Struct.ComponentSchema {
  collectionName: 'components_landing_sections_section_sixes';
  info: {
    description: '';
    displayName: 'Section Six';
  };
  attributes: {
    Button: Schema.Attribute.Component<'section.button', false>;
    Description: Schema.Attribute.Blocks;
    Gallery: Schema.Attribute.Media<'images', true>;
    Title: Schema.Attribute.Component<'section.title', false> &
      Schema.Attribute.Required;
  };
}

export interface LandingSectionsSectionThree extends Struct.ComponentSchema {
  collectionName: 'components_landing_sections_section_threes';
  info: {
    description: '';
    displayName: 'Section Three';
  };
  attributes: {
    Button: Schema.Attribute.Component<'section.button', true>;
    Description: Schema.Attribute.Blocks;
    Photos: Schema.Attribute.Media<'images', true>;
    Title: Schema.Attribute.Component<'shared.quote', false>;
  };
}

export interface LandingSectionsSectionTwo extends Struct.ComponentSchema {
  collectionName: 'components_landing_sections_section_twos';
  info: {
    description: '';
    displayName: 'Section Two';
  };
  attributes: {
    List_Description: Schema.Attribute.Component<
      'section.icon-description',
      true
    >;
    Title: Schema.Attribute.Component<'section.title', false>;
  };
}

export interface SectionAccordion extends Struct.ComponentSchema {
  collectionName: 'components_section_accordions';
  info: {
    displayName: 'Accordion';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionButton extends Struct.ComponentSchema {
  collectionName: 'components_section_buttons';
  info: {
    description: '';
    displayName: 'Button';
  };
  attributes: {
    Action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/'>;
    Text: Schema.Attribute.String;
    Variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'transparent']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SectionDetailedDescription extends Struct.ComponentSchema {
  collectionName: 'components_section_detailed_descriptions';
  info: {
    displayName: 'Detailed Description';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 2;
      }>;
  };
}

export interface SectionHiddenLink extends Struct.ComponentSchema {
  collectionName: 'components_section_hidden_links';
  info: {
    displayName: 'Hidden Link';
  };
  attributes: {
    Link: Schema.Attribute.String & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionIconDescription extends Struct.ComponentSchema {
  collectionName: 'components_section_icon_descriptions';
  info: {
    description: '';
    displayName: 'Icon Description';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SectionLinks extends Struct.ComponentSchema {
  collectionName: 'components_section_links';
  info: {
    description: '';
    displayName: 'Links';
    icon: 'earth';
  };
  attributes: {
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
  };
}

export interface SectionShapeTitle extends Struct.ComponentSchema {
  collectionName: 'components_section_shape_titles';
  info: {
    description: '';
    displayName: 'Shape Title';
  };
  attributes: {
    Shape: Schema.Attribute.Media<'images'>;
    Title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
  };
}

export interface SectionTitle extends Struct.ComponentSchema {
  collectionName: 'components_section_titles';
  info: {
    displayName: 'Title';
  };
  attributes: {
    Placement: Schema.Attribute.Enumeration<['Center', 'Right', 'Left']> &
      Schema.Attribute.DefaultTo<'Center'>;
    Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
  };
}

export interface SharedEventTime extends Struct.ComponentSchema {
  collectionName: 'components_shared_event_times';
  info: {
    description: '';
    displayName: 'Event Time';
  };
  attributes: {
    Beginning: Schema.Attribute.DateTime & Schema.Attribute.Required;
    Minutes: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<30>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedMembership extends Struct.ComponentSchema {
  collectionName: 'components_shared_memberships';
  info: {
    description: '';
    displayName: 'Membership';
    icon: 'user';
  };
  attributes: {
    abonement: Schema.Attribute.Relation<
      'oneToOne',
      'api::abonement.abonement'
    >;
    Activated: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    Amount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    endDate: Schema.Attribute.Date & Schema.Attribute.Required;
    Expired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    startDate: Schema.Attribute.Date;
    Unlimited: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface SharedMethod extends Struct.ComponentSchema {
  collectionName: 'components_shared_methods';
  info: {
    description: '';
    displayName: 'Method';
  };
  attributes: {
    Active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    Experience: Schema.Attribute.Enumeration<
      ['beginner', 'standard', 'professional', 'master']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'beginner'>;
    Icon: Schema.Attribute.Media<'images'>;
    Name: Schema.Attribute.Enumeration<
      ['Hatha yoga', 'Power yoga', 'Vinyasa flow', 'Kundalini', 'Stretching']
    > &
      Schema.Attribute.Required;
  };
}

export interface SharedPrice extends Struct.ComponentSchema {
  collectionName: 'components_shared_prices';
  info: {
    displayName: 'Price';
  };
  attributes: {
    Amount: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 5;
        },
        number
      > &
      Schema.Attribute.DefaultTo<500>;
    Shape: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    description: '';
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    motto: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSocialMediaLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_media_links';
  info: {
    description: '';
    displayName: 'Social Media Link';
    icon: 'link';
  };
  attributes: {
    Icon: Schema.Attribute.Media<'images'>;
    Name: Schema.Attribute.String;
    Show: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
  };
}

export interface SharedUserSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_user_socials';
  info: {
    description: '';
    displayName: 'UserSocial';
    icon: 'discuss';
  };
  attributes: {
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    social: Schema.Attribute.Enumeration<
      ['Instagram', 'X (Twitter)', 'Facebook', 'LinkedIn', 'Telegram ']
    > &
      Schema.Attribute.Required;
    verified: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'landing-sections.section-eight': LandingSectionsSectionEight;
      'landing-sections.section-five': LandingSectionsSectionFive;
      'landing-sections.section-four': LandingSectionsSectionFour;
      'landing-sections.section-one': LandingSectionsSectionOne;
      'landing-sections.section-seven': LandingSectionsSectionSeven;
      'landing-sections.section-six': LandingSectionsSectionSix;
      'landing-sections.section-three': LandingSectionsSectionThree;
      'landing-sections.section-two': LandingSectionsSectionTwo;
      'section.accordion': SectionAccordion;
      'section.button': SectionButton;
      'section.detailed-description': SectionDetailedDescription;
      'section.hidden-link': SectionHiddenLink;
      'section.icon-description': SectionIconDescription;
      'section.links': SectionLinks;
      'section.shape-title': SectionShapeTitle;
      'section.title': SectionTitle;
      'shared.event-time': SharedEventTime;
      'shared.media': SharedMedia;
      'shared.membership': SharedMembership;
      'shared.method': SharedMethod;
      'shared.price': SharedPrice;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.social-media-link': SharedSocialMediaLink;
      'shared.user-social': SharedUserSocial;
    }
  }
}
