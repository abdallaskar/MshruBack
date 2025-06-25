// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.message);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'حدث خطأ في الخادم',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
};

export default errorHandler;
