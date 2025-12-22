// app/types/telegram.d.ts

// Enums
type ColorScheme = 'dark' | 'light';
type Platform = string; // e.g., 'android', 'ios', etc.
type BottomButtonType = 'main' | 'secondary';
type BottomButtonPosition = 'bottom' | 'left' | 'right' | 'top';
type PopupButtonType = 'cancel' | 'close' | 'default' | 'destructive' | 'ok';
type InvoiceStatus = 'cancelled' | 'failed' | 'paid' | 'pending';
type BiometricType = 'face' | 'finger' | 'unknown';
type EventStatus = 'allowed' | 'cancelled' | 'sent';
type HomeScreenStatus = 'added' | 'missed' | 'unknown' | 'unsupported';
type FileDownloadStatus = 'cancelled' | 'downloading';
type EmojiStatusError =
  | 'DURATION_INVALID'
  | 'SERVER_ERROR'
  | 'SUGGESTED_EMOJI_INVALID'
  | 'UNKNOWN_ERROR'
  | 'UNSUPPORTED'
  | 'USER_DECLINED';
type ShareMessageError =
  | 'MESSAGE_EXPIRED'
  | 'MESSAGE_SEND_FAILED'
  | 'UNKNOWN_ERROR'
  | 'UNSUPPORTED'
  | 'USER_DECLINED';
type SensorError = 'ALREADY_FULLSCREEN' | 'UNSUPPORTED';

// Interfaces
interface ThemeParams {
  accent_text_color?: string;
  bg_color?: string;
  bottom_bar_bg_color?: string;
  button_color?: string;
  button_text_color?: string;
  destructive_text_color?: string;
  header_bg_color?: string;
  hint_color?: string;
  link_color?: string;
  secondary_bg_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  section_separator_color?: string;
  subtitle_text_color?: string;
  text_color?: string;
}

interface SafeAreaInset {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

interface ContentSafeAreaInset {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

interface WebAppUser {
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  first_name: string;
  id: number;
  is_bot?: boolean;
  is_premium?: boolean;
  language_code?: string;
  last_name?: string;
  photo_url?: string;
  username?: string;
}

interface WebAppChat {
  id: number;
  photo_url?: string;
  title: string;
  type: 'channel' | 'group' | 'supergroup';
  username?: string;
}

interface WebAppInitData {
  auth_date: number;
  can_send_after?: number;
  chat?: WebAppChat;
  chat_instance?: string;
  chat_type?: 'channel' | 'group' | 'private' | 'sender' | 'supergroup';
  hash: string;
  query_id?: string;
  receiver?: WebAppUser;
  signature?: string;
  start_param?: string;
  user?: WebAppUser;
}

interface StoryShareParams {
  text?: string;
  widget_link?: StoryWidgetLink;
}

interface StoryWidgetLink {
  name?: string;
  url: string;
}

interface ScanQrPopupParams {
  text?: string;
}

interface PopupParams {
  buttons?: PopupButton[];
  message: string;
  title?: string;
}

interface PopupButton {
  id?: string;
  text?: string;
  type?: PopupButtonType;
}

interface EmojiStatusParams {
  duration?: number;
}

interface DownloadFileParams {
  file_name: string;
  url: string;
}

interface AccelerometerStartParams {
  refresh_rate?: number;
}

interface DeviceOrientationStartParams {
  need_absolute?: boolean;
  refresh_rate?: number;
}

interface GyroscopeStartParams {
  refresh_rate?: number;
}

interface LocationData {
  altitude: number | null;
  course: number | null;
  course_accuracy: number | null;
  horizontal_accuracy: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
  speed_accuracy: number | null;
  vertical_accuracy: number | null;
}

interface BiometricRequestAccessParams {
  reason?: string;
}

interface BiometricAuthenticateParams {
  reason?: string;
}

// Classes/Objects Interfaces
interface BackButton {
  isVisible: boolean;
  hide: () => BackButton;
  offClick: (callback: () => void) => void;
  onClick: (callback: () => void) => void;
  show: () => BackButton;
}

interface BottomButton {
  color: string;
  hasShineEffect: boolean;
  isActive: boolean;
  isProgressVisible: boolean;
  isVisible: boolean;
  position?: BottomButtonPosition;
  text: string;
  textColor: string;
  type: BottomButtonType;
  disable: () => BottomButton;
  enable: () => BottomButton;
  hide: () => BottomButton;
  hideProgress: () => BottomButton;
  offClick: (callback: () => void) => void;
  onClick: (callback: () => void) => void;
  setParams: (params: {
    text?: string;
    color?: string;
    text_color?: string;
    has_shine_effect?: boolean;
    position?: BottomButtonPosition;
    is_active?: boolean;
    is_visible?: boolean;
  }) => BottomButton;
  setText: (text: string) => BottomButton;
  show: () => BottomButton;
  showProgress: (leaveActive?: boolean) => BottomButton;
}

interface SettingsButton {
  isVisible: boolean;
  hide: () => SettingsButton;
  offClick: (callback: () => void) => void;
  onClick: (callback: () => void) => void;
  show: () => SettingsButton;
}

interface HapticFeedback {
  impactOccurred: (style: 'heavy' | 'light' | 'medium' | 'rigid' | 'soft') => void;
  notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
  selectionChanged: () => void;
}

interface CloudStorage {
  getItem: (key: string, callback: (error: any, value?: string) => void) => void;
  getItems: (
    keys: string[],
    callback: (error: any, values?: Record<string, string>) => void
  ) => void;
  getKeys: (callback: (error: any, keys?: string[]) => void) => void;
  removeItem: (key: string, callback?: (error: any, success: boolean) => void) => void;
  removeItems: (keys: string[], callback?: (error: any, success: boolean) => void) => void;
  setItem: (key: string, value: string, callback?: (error: any, success: boolean) => void) => void;
}

interface BiometricManager {
  biometricType: BiometricType;
  deviceId: string;
  isAccessGranted: boolean;
  isAccessRequested: boolean;
  isBiometricAvailable: boolean;
  isBiometricTokenSaved: boolean;
  isInited: boolean;
  authenticate: (
    params: BiometricAuthenticateParams,
    callback?: (success: boolean, token?: string) => void
  ) => void;
  init: (callback?: () => void) => void;
  openSettings: () => void;
  requestAccess: (
    params: BiometricRequestAccessParams,
    callback?: (granted: boolean) => void
  ) => void;
  updateBiometricToken: (token: string, callback?: (success: boolean) => void) => void;
}

interface Accelerometer {
  isStarted: boolean;
  x: number;
  y: number;
  z: number;
  start: (params?: AccelerometerStartParams, callback?: (success: boolean) => void) => void;
  stop: (callback?: (success: boolean) => void) => void;
}

interface DeviceOrientation {
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;
  isStarted: boolean;
  start: (params?: DeviceOrientationStartParams, callback?: (success: boolean) => void) => void;
  stop: (callback?: (success: boolean) => void) => void;
}

interface Gyroscope {
  isStarted: boolean;
  x: number;
  y: number;
  z: number;
  start: (params?: GyroscopeStartParams, callback?: (success: boolean) => void) => void;
  stop: (callback?: (success: boolean) => void) => void;
}

interface LocationManager {
  isAccessGranted: boolean;
  isAccessRequested: boolean;
  isInited: boolean;
  isLocationAvailable: boolean;
  getLocation: (callback: (error: any, locationData?: LocationData) => void) => void;
  init: (callback?: () => void) => void;
  openSettings: () => void;
}

interface DeviceStorage {
  clear: (callback?: (error: any, success: boolean) => void) => void;
  getItem: (key: string, callback: (error: any, value?: string) => void) => void;
  removeItem: (key: string, callback?: (error: any, success: boolean) => void) => void;
  setItem: (key: string, value: string, callback?: (error: any, success: boolean) => void) => void;
}

interface SecureStorage {
  clear: (callback?: (error: any, success: boolean) => void) => void;
  getItem: (
    key: string,
    callback: (error: any, value?: string, restorable?: boolean) => void
  ) => void;
  removeItem: (key: string, callback?: (error: any, success: boolean) => void) => void;
  restoreItem: (key: string, callback?: (error: any, value?: string) => void) => void;
  setItem: (key: string, value: string, callback?: (error: any, success: boolean) => void) => void;
}

// Main WebApp Interface
interface WebApp {
  Accelerometer: Accelerometer;
  BackButton: BackButton;
  backgroundColor: string;
  BiometricManager: BiometricManager;
  bottomBarColor: string;
  CloudStorage: CloudStorage;
  colorScheme: ColorScheme;
  contentSafeAreaInset: ContentSafeAreaInset;
  DeviceOrientation: DeviceOrientation;
  DeviceStorage: DeviceStorage;
  Gyroscope: Gyroscope;
  HapticFeedback: HapticFeedback;
  headerColor: string;
  // Properties
  initData: string;
  initDataUnsafe: WebAppInitData;
  isActive: boolean;
  isClosingConfirmationEnabled: boolean;
  isExpanded: boolean;
  isFullscreen: boolean;
  isOrientationLocked: boolean;
  isVerticalSwipesEnabled: boolean;
  LocationManager: LocationManager;
  MainButton: BottomButton;
  platform: Platform;
  safeAreaInset: SafeAreaInset;
  SecondaryButton: BottomButton;
  SecureStorage: SecureStorage;
  SettingsButton: SettingsButton;
  themeParams: ThemeParams;
  version: string;
  viewportHeight: number;
  viewportStableHeight: number;

  addToHomeScreen: () => void;
  checkHomeScreenStatus: (callback?: (status: HomeScreenStatus) => void) => void;
  close: () => void;
  closeScanQrPopup: () => void;
  disableClosingConfirmation: () => void;
  disableVerticalSwipes: () => void;
  downloadFile: (params: DownloadFileParams, callback?: (accepted: boolean) => void) => void;
  enableClosingConfirmation: () => void;
  enableVerticalSwipes: () => void;
  exitFullscreen: () => void;
  expand: () => void;
  hideKeyboard: () => void;
  // Methods
  isVersionAtLeast: (version: string) => boolean;
  lockOrientation: () => void;
  offEvent: (eventType: string, eventHandler: (...args: any[]) => void) => void;
  onEvent: (eventType: string, eventHandler: (...args: any[]) => void) => void;
  openInvoice: (url: string, callback?: (status: InvoiceStatus) => void) => void;
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  openTelegramLink: (url: string) => void;
  readTextFromClipboard: (callback?: (text: string | null) => void) => void;
  ready: () => void;
  requestContact: (callback?: (status: EventStatus) => void) => void;
  requestEmojiStatusAccess: (callback?: (granted: boolean) => void) => void;
  requestFullscreen: () => void;
  requestWriteAccess: (callback?: (status: EventStatus) => void) => void;
  sendData: (data: string) => void;
  setBackgroundColor: (color: string) => void;
  setBottomBarColor: (color: string) => void;
  setEmojiStatus: (
    custom_emoji_id: string,
    params?: EmojiStatusParams,
    callback?: (success: boolean) => void
  ) => void;
  setHeaderColor: (color: string) => void;
  shareMessage: (msg_id: string, callback?: (success: boolean) => void) => void;
  shareToStory: (media_url: string, params?: StoryShareParams) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback?: (ok: boolean) => void) => void;
  showPopup: (params: PopupParams, callback?: (buttonId: string | null) => void) => void;
  showScanQrPopup: (params: ScanQrPopupParams, callback?: (text: string | null) => void) => void;
  switchInlineQuery: (
    query: string,
    choose_chat_types?: ('bots' | 'channels' | 'groups' | 'users')[]
  ) => void;
  unlockOrientation: () => void;
}

// Event Handlers (types only, not part of WebApp interface)
type EventHandler<T = any> = (this: WebApp, data?: T) => void;

// Event Types
type ActivatedEventHandler = EventHandler;
type DeactivatedEventHandler = EventHandler;
type ThemeChangedEventHandler = EventHandler;
type ViewportChangedEventHandler = EventHandler<{ isStateStable: boolean }>;
type SafeAreaChangedEventHandler = EventHandler;
type ContentSafeAreaChangedEventHandler = EventHandler;
type MainButtonClickedEventHandler = EventHandler;
type SecondaryButtonClickedEventHandler = EventHandler;
type BackButtonClickedEventHandler = EventHandler;
type SettingsButtonClickedEventHandler = EventHandler;
type PopupClosedEventHandler = EventHandler<{ button_id: string | null }>;
type ScanQrPopupClosedEventHandler = EventHandler;
type ClipboardTextReceivedEventHandler = EventHandler<{ req_id: string; data: string | null }>;
type WriteAccessRequestedEventHandler = EventHandler<{ status: EventStatus }>;
type ContactRequestedEventHandler = EventHandler<{ status: EventStatus }>;
type InvoiceClosedEventHandler = EventHandler<{ url: string; status: InvoiceStatus }>;
type EmojiStatusAccessRequestedEventHandler = EventHandler<{ granted: boolean }>;
type EmojiStatusChangedEventHandler = EventHandler<{ success: boolean }>;
type DownloadFileAcceptedEventHandler = EventHandler<{ url: string; accepted: boolean }>;
type FileDownloadedEventHandler = EventHandler<{ url: string; status: FileDownloadStatus }>;
type FullscreenChangedEventHandler = EventHandler<{ isFullscreen: boolean }>;
type OrientationChangedEventHandler = EventHandler<{ isLocked: boolean }>;
type AccelerometerDataChangedEventHandler = EventHandler<{ x: number; y: number; z: number }>;
type DeviceOrientationChangedEventHandler = EventHandler<{
  alpha: number;
  beta: number;
  gamma: number;
}>;
type GyroscopeDataChangedEventHandler = EventHandler<{ x: number; y: number; z: number }>;
type LocationAccessRequestedEventHandler = EventHandler<{ granted: boolean }>;
type LocationChangedEventHandler = EventHandler<LocationData>;
type HomeScreenStatusChangedEventHandler = EventHandler<{ status: HomeScreenStatus }>;
type ShareMessageErrorEventHandler = EventHandler<{ error: ShareMessageError }>;
type EmojiStatusErrorEventHandler = EventHandler<{ error: EmojiStatusError }>;
type SensorErrorEventHandler = EventHandler<{ error: SensorError }>;
