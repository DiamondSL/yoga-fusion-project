import type { Schema, Struct } from '@strapi/strapi';

export interface LandingSectionsSectionEight extends Struct.ComponentSchema {
  collectionName: 'components_landing_sections_section_eights';
  info: {
    displayName: 'Section Eight';
  };
  attributes: {
    FAQ_elements: Schema.Attribute.Component<'section.accordion', true>;
    Title: Schema.Attribute.Component<'section.title', false> &
      Schema.Attribute.Required;
  };
}

export interface LandingSectionsSectionFive extends Struct.ComponentSchema {
  collectionName: 'components_landing_sections_section_fives';
  info: {
    displayName: 'Section Five';
  };
  attributes: {
    Button: Schema.Attribute.Component<'section.button', false>;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
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
    displayName: 'Section Six';
  };
  attributes: {
    Button: Schema.Attribute.Component<'section.button', false>;
    Description: Schema.Attribute.Text;
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
    displayName: 'Icon Description';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    Icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SectionShapeTitle extends Struct.ComponentSchema {
  collectionName: 'components_section_shape_titles';
  info: {
    displayName: 'Shape Title';
  };
  attributes: {
    Shape: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
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
      'section.hidden-link': SectionHiddenLink;
      'section.icon-description': SectionIconDescription;
      'section.shape-title': SectionShapeTitle;
      'section.title': SectionTitle;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
