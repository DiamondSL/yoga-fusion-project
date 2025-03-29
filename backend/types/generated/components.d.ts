import type { Schema, Struct } from '@strapi/strapi';

export interface LandingPageComponentsSectionEight
  extends Struct.ComponentSchema {
  collectionName: 'components_landing_page_components_section_eights';
  info: {
    displayName: 'Section_Eight';
  };
  attributes: {
    FAQ_elements: Schema.Attribute.Component<'section.accordion', true>;
    Title: Schema.Attribute.Component<'section.title', false>;
  };
}

export interface LandingPageComponentsSectionFive
  extends Struct.ComponentSchema {
  collectionName: 'components_landing_page_components_section_fives';
  info: {
    displayName: 'Section_Five';
  };
  attributes: {
    Button: Schema.Attribute.Component<'section.button', false> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LandingPageComponentsSectionFour
  extends Struct.ComponentSchema {
  collectionName: 'components_landing_page_components_section_fours';
  info: {
    displayName: 'Section_Four';
  };
  attributes: {
    Shape_Titles: Schema.Attribute.Component<'section.shape-title', true>;
    Title: Schema.Attribute.Component<'section.title', false>;
  };
}

export interface LandingPageComponentsSectionOne
  extends Struct.ComponentSchema {
  collectionName: 'components_landing_page_components_section_ones';
  info: {
    description: '';
    displayName: 'Section_One';
  };
  attributes: {
    Buttons: Schema.Attribute.Component<'section.button', true>;
    Title: Schema.Attribute.Component<'section.title', true>;
  };
}

export interface LandingPageComponentsSectionSeven
  extends Struct.ComponentSchema {
  collectionName: 'components_landing_page_components_section_sevens';
  info: {
    displayName: 'Section_Seven';
  };
  attributes: {
    Placement: Schema.Attribute.RichText & Schema.Attribute.Required;
    Route: Schema.Attribute.Component<'shared.hidden-link', true>;
    Title: Schema.Attribute.String;
  };
}

export interface LandingPageComponentsSectionSix
  extends Struct.ComponentSchema {
  collectionName: 'components_landing_page_components_section_sixes';
  info: {
    displayName: 'Section_Six';
  };
  attributes: {
    Button: Schema.Attribute.Component<'section.button', false>;
    Description: Schema.Attribute.Text;
    Gallery: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Title: Schema.Attribute.Component<'section.title', false>;
  };
}

export interface LandingPageComponentsSectionThree
  extends Struct.ComponentSchema {
  collectionName: 'components_landing_page_components_section_threes';
  info: {
    description: '';
    displayName: 'Section_Three';
  };
  attributes: {
    Button: Schema.Attribute.Component<'section.button', true>;
    Description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    Photos: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
    Title: Schema.Attribute.Component<'shared.quote', false> &
      Schema.Attribute.Required;
  };
}

export interface LandingPageComponentsSectionTwo
  extends Struct.ComponentSchema {
  collectionName: 'components_landing_page_components_section_twos';
  info: {
    description: '';
    displayName: 'Section_Two';
  };
  attributes: {
    ListDescription: Schema.Attribute.Component<
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
    action: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/'>;
    Text: Schema.Attribute.String & Schema.Attribute.Required;
    Variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'transparent']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SectionIconDescription extends Struct.ComponentSchema {
  collectionName: 'components_section_icon_descriptions';
  info: {
    displayName: 'Icon_Description';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    Icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
  };
}

export interface SectionShapeTitle extends Struct.ComponentSchema {
  collectionName: 'components_section_shape_titles';
  info: {
    displayName: 'Shape_Title';
  };
  attributes: {
    Shape: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionTitle extends Struct.ComponentSchema {
  collectionName: 'components_section_titles';
  info: {
    description: '';
    displayName: 'Title';
  };
  attributes: {
    Placement: Schema.Attribute.Enumeration<['Left', 'Center', 'Right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Center'>;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHiddenLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_hidden_links';
  info: {
    displayName: 'HiddenLink';
  };
  attributes: {
    Link: Schema.Attribute.String & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'landing-page-components.section-eight': LandingPageComponentsSectionEight;
      'landing-page-components.section-five': LandingPageComponentsSectionFive;
      'landing-page-components.section-four': LandingPageComponentsSectionFour;
      'landing-page-components.section-one': LandingPageComponentsSectionOne;
      'landing-page-components.section-seven': LandingPageComponentsSectionSeven;
      'landing-page-components.section-six': LandingPageComponentsSectionSix;
      'landing-page-components.section-three': LandingPageComponentsSectionThree;
      'landing-page-components.section-two': LandingPageComponentsSectionTwo;
      'section.accordion': SectionAccordion;
      'section.button': SectionButton;
      'section.icon-description': SectionIconDescription;
      'section.shape-title': SectionShapeTitle;
      'section.title': SectionTitle;
      'shared.hidden-link': SharedHiddenLink;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
