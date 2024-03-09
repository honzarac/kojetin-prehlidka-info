export interface Show {
  showName: String,
  groupName: String|null,
  time: Number|null,
  length: Number|null,
  date: String|null,
  photos: Array<String>,
  slideDuration?: Number,
  announcement?: String|null,
}