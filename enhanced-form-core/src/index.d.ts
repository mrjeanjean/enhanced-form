import { DefineComponent, ComponentOptionsMixin } from 'vue';

// ─── Options ──────────────────────────────────────────────────────────────────

export interface EnhancedFormOptions {
  onSelectFile?: (options: { imageOptions?: { width: number; height: number }; beforeFetch?: () => void }) => Promise<{ image: { url: string } }>;
  allowAddBlock?: boolean;
  blockActions?: Array<'move' | 'delete'>;
  imagesFolder?: string;
}

export interface CreateComponentOptions {
  name: string;
  menuLabel: string;
  icon: string | string[] | object | object[];
  fields: Field[];
  component?: DefineComponent;
  hideOnMenu?: boolean;
  category?: string;
}

// ─── Field types ──────────────────────────────────────────────────────────────

export interface Field {
  name: string;
  type: string;
  value: unknown;
  options?: object;
  settings: object[];
  addSetting(component: DefineComponent, label?: string): Field;
}

export interface InputOptions {
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export interface TextAreaOptions {
  placeholder?: string;
}

export interface ImageOptions {
  width?: number;
  height?: number;
}

export interface SpinnerOptions {
  min?: number;
  max?: number;
  step?: number;
}

export interface ChoiceOptions {
  choices: Record<string, string> | (() => Record<string, string>);
  placeholder?: string;
}

export interface RepeaterOptions {
  fixed?: boolean;
  size?: number;
}

// ─── EnhancedForm class ───────────────────────────────────────────────────────

export declare class EnhancedForm {
  constructor(input: HTMLTextAreaElement, options?: EnhancedFormOptions);
  render(): void;
  createComponent(options: CreateComponentOptions): void;
  deregisterBlock(name: string): void;
  getBlock(name: string): object | null;
  editBlockProps(name: string, props: object, fieldName?: string): void;
  editBlockContent(name: string, value: object): void;
  addBlockSetting(name: string, field: Field): void;
}

// ─── attachEnhancedForm ───────────────────────────────────────────────────────

export declare function attachEnhancedForm(input: HTMLTextAreaElement, options?: EnhancedFormOptions): EnhancedForm;

// ─── Field factories ──────────────────────────────────────────────────────────

export declare function createInputField(name: string, options?: InputOptions): Field;
export declare function createTextField(name: string, options?: object): Field;
export declare function createTextAreaField(name: string, options?: TextAreaOptions): Field;
export declare function createImageField(name: string, options?: ImageOptions): Field;
export declare function createSpinnerField(name: string, options?: SpinnerOptions): Field;
export declare function createSwitchField(name: string, options?: object): Field;
export declare function createChoiceField(name: string, options?: ChoiceOptions): Field;
export declare function createFileField(name: string, options?: object): Field;
export declare function createRepeater(name: string, model?: Field[], options?: RepeaterOptions): Field;
export declare function createRow(name: string, model: Field[], options?: { reverse?: boolean }): Field;

// ─── Components ───────────────────────────────────────────────────────────────

export declare const InputField: DefineComponent;
export declare const ImageField: DefineComponent;
export declare const TextEditorField: DefineComponent;
export declare const TextAreaField: DefineComponent;
export declare const TextInlineField: DefineComponent;
export declare const FileField: DefineComponent;
export declare const CheckboxField: DefineComponent;
export declare const SelectField: DefineComponent;
export declare const SwitchField: DefineComponent;
export declare const SpinnerField: DefineComponent;
export declare const RepeatField: DefineComponent;
export declare const RowField: DefineComponent;
export declare const Icon: DefineComponent;
export declare const Loader: DefineComponent;

// ─── Mixins ───────────────────────────────────────────────────────────────────

export declare const InputMixin: ComponentOptionsMixin & {
  props: {
    content: object;
    id: string;
    fields: Field[];
  };
  methods: {
    onInput(value: unknown, fieldName: string): void;
    onMultipleInput(data: object): void;
    getFieldOptions(fieldName: string): object;
  };
};