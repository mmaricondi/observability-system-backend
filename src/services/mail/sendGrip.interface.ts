interface SendEmailData {
  to: string
  subject: string
  text?: string
  html?: string
}

interface SendTemplateData {
  to: string
  dynamicData: Record<string, any>
}

export {
    SendEmailData,
    SendTemplateData
}