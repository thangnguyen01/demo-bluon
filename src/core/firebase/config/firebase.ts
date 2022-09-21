import { ExecutionEnvironment } from 'src/environment/constants/excution-environment.enum';
/* eslint-disable max-len */

export type FireBaseConfigType = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
};

const DEV = {

  type: 'service_account',
  project_id: 'example-bluon-realtime-support',
  private_key_id: '6c557acba24a77a69a089b293ded83927b0ceda1',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC6MImHVUi+DlFg\n034ZjOG9JuLpiw7DYok7UM/L+E1tau14HyIbwhwcOk3L8YMnVPJn7Zl2Ld/vPY5p\nO1gGDvBeT4XwxKzVsHsJBamHiA6H4Gf2d64xmj2cnikYFq1N1LDyUSF9wPjC7TFw\nYryg1epgBt5hSDHGwGvdd7FmSNOFhYmpo4NIUiRr/X/p90nVNP5BxcvVP2s4n5MB\nExfOLsjGIXqUWQeMhvvOsaohgHzX848fS6lysxigSleXgVu18+kFzi9x5ZE/XLyt\namLjs+SwJVIb5zWvBdtQUuNvRGxOSxPXWglFgtu4WtCJtL/gvmIuyQMqvFGGS5wi\nUvU7SFc/AgMBAAECggEAG1acIvsX8rwZy9dR/oDBS+uanthpuFukCHRtsSaKK+Tq\n7bEt6hh+1dA5HcHI/wH0k+OpyFX6ZF+hT6dEiKMx57nSfLn2zMDx19nKfNmH6gCT\nvfdFubJ1lc+3+079GbP/Wp0kse50jZ6T8fYKz1eJke8AQRV/euOZvaDhCJfsjaqq\nGHviha52m8rO6WtySO+OHBgovQKSgybJAeM4x5KNXbTCwbjdTXL7bGlxKbhFREFA\nDDZedhN+oVATPWp29/BhHqOBUsgpTMC1F/3C4Ddtqy/vBx6UiBqg3XC3M0xYkEyV\nnLlPbSYH7IPOzvrJkNrcOn/ccmWJyiondEmLRiQZkQKBgQD4W7JA6oqzqp1ihaXy\n1hBvZ3r3yjP0Ztof4ZX9c4Ys9YcPMuCVZeongXKlhVmU28jLnXd7nfnXWU+N3HvF\nooOb4nPH1J3jgls1z2d5qVt3W0SLjkJqPIbKD6aOURrzXUqsyzMaYue+3Pto7bqX\n9RYS+n4RHxIwzU7MH0B3L9HLUQKBgQC/6yRyzOtnqv7OtxNm1U8NIW51iNbq24JT\nOtS0FlmbadJyetjOojRTYU3kSXdJ6DEfax293PjM8h0hr6AtW9JZ2qJGWj1nNMUR\n/SMC9n1kH6skUelsSnegzX3cisF85aNS9Ui6j9ShuxQwNp/jsT4o3jp4dhHU7beL\nA2MYNgA1jwKBgEqzSeo8oXto1e3MRR3FRSw887+UEgxw4yqzr2mMVc8wCm+H3gUR\nolw/kzw137vmX37e3hFQctVTB5qjtpa7StqYQjrYuKS1kLmeqIDvb5N24CcZouBR\nVDlye6ZSvsh0RwGyHKzTEuFVlkj5OCZ8kSckMMb1kYMcPZcnzzwKJhABAoGAGzjv\nYplOitXmbsvpJJz9KY+ka2eNlKKuSb/+i8zfyPuprjNerXC0m18h/U+ua/1TenFn\nNpcxc2CkYTLYNZbgr34jpncGXq1Nhs+xN6pe/uS/EdfMlF+7uENtpurHpz+rewjv\n2Aau0oIGyw/0fgeWGZXsFUoqHVnavw0r8TM3tGECgYBDxnu12xZV8R3qfYdI2szZ\nIe1yjJEgkyxDPblibsUWHcZpLDi6U33YJKTOcVxns4Oomip9/Owhb4y06kjhX1fz\nOvjf7wPjGR0WxETiMkoU/6bz13GDiaIcQKR6h5VjhMWL6gwr1VOVCtKGoG9KmjZO\npUTKYz3tQjxC/V5fmi9JcQ==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-b4b59@example-bluon-realtime-support.iam.gserviceaccount.com',
  client_id: '108233682419239119555',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b4b59%40example-bluon-realtime-support.iam.gserviceaccount.com'
};



export const EnvironmentFirebaseConfig: { [key in ExecutionEnvironment]: any } = {
  dev: DEV
};
