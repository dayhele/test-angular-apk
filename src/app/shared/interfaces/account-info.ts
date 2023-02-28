export interface AccountInfo {
    success: {
        message: string,
        data: {
            status: string,
            subscription_type: string,
            payment_forecast: string,
            days: number,
            toaster: string,
            toastTitle: string,
            toastDesc: string,
            toastClass: string,
            subscription_rule: string,
        }
    }
}
