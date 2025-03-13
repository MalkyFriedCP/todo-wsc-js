class ServiceError extends Error {
  status: number;
  details: any;

  constructor(message: string, status: number = 500, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = "ServiceError";
  }
}

export default ServiceError;
