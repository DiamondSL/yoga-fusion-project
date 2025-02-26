import type { Schema, Struct } from '@strapi/strapi';

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
    displayName: 'Button';
  };
  attributes: {
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
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
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
      'section.accordion': SectionAccordion;
      'section.button': SectionButton;
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
