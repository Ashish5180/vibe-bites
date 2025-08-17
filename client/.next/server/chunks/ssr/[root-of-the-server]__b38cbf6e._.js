module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/context/CartContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CartProvider": ()=>CartProvider,
    "useCart": ()=>useCart
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
const cartReducer = (state, action)=>{
    switch(action.type){
        case 'LOAD_CART':
            return {
                ...state,
                ...action.payload
            };
        case 'ADD_ITEM':
            const existingItem = state.items.find((item)=>item.id === action.payload.id && item.selectedSize === action.payload.selectedSize);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item)=>item.id === action.payload.id && item.selectedSize === action.payload.selectedSize ? {
                            ...item,
                            quantity: item.quantity + action.payload.quantity
                        } : item)
                };
            } else {
                return {
                    ...state,
                    items: [
                        ...state.items,
                        action.payload
                    ]
                };
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((item)=>!(item.id === action.payload.id && item.selectedSize === action.payload.selectedSize))
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map((item)=>item.id === action.payload.id && item.selectedSize === action.payload.selectedSize ? {
                        ...item,
                        quantity: action.payload.quantity
                    } : item)
            };
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                appliedCoupon: null
            };
        case 'APPLY_COUPON':
            return {
                ...state,
                appliedCoupon: action.payload
            };
        case 'REMOVE_COUPON':
            return {
                ...state,
                appliedCoupon: null
            };
        default:
            return state;
    }
};
const CartProvider = ({ children })=>{
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(cartReducer, {
        items: [],
        appliedCoupon: null
    });
    // Load cart from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedCart = localStorage.getItem('vibe-bites-cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            dispatch({
                type: 'LOAD_CART',
                payload: parsedCart
            });
        }
    }, []);
    // Save cart to localStorage whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('vibe-bites-cart', JSON.stringify(state));
        // If logged-in, try to sync to server (best-effort)
        const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        state
    ]);
    const addToCart = (product, selectedSize, quantity = 1)=>{
        const price = product.sizes.find((size)=>size.size === selectedSize)?.price || 0;
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: product.id,
                name: product.name,
                image: product.image,
                selectedSize,
                price,
                quantity,
                category: product.category
            }
        });
    };
    const removeFromCart = (id, selectedSize)=>{
        dispatch({
            type: 'REMOVE_ITEM',
            payload: {
                id,
                selectedSize
            }
        });
    };
    const updateQuantity = (id, selectedSize, quantity)=>{
        if (quantity <= 0) {
            removeFromCart(id, selectedSize);
        } else {
            dispatch({
                type: 'UPDATE_QUANTITY',
                payload: {
                    id,
                    selectedSize,
                    quantity
                }
            });
        }
    };
    const clearCart = ()=>{
        dispatch({
            type: 'CLEAR_CART'
        });
    };
    const applyCoupon = (couponCode)=>{
        const coupons = {
            'VIBE10': {
                discount: 10,
                type: 'percentage'
            },
            'MAKHANA20': {
                discount: 20,
                type: 'percentage',
                category: 'Makhana'
            }
        };
        const coupon = coupons[couponCode.toUpperCase()];
        if (coupon) {
            dispatch({
                type: 'APPLY_COUPON',
                payload: {
                    code: couponCode.toUpperCase(),
                    ...coupon
                }
            });
            return {
                success: true,
                message: `Coupon ${couponCode.toUpperCase()} applied!`
            };
        } else {
            return {
                success: false,
                message: 'Invalid coupon code'
            };
        }
    };
    const removeCoupon = ()=>{
        dispatch({
            type: 'REMOVE_COUPON'
        });
    };
    const getCartTotal = ()=>{
        const subtotal = state.items.reduce((total, item)=>total + item.price * item.quantity, 0);
        if (!state.appliedCoupon) return subtotal;
        let discount = 0;
        if (state.appliedCoupon.type === 'percentage') {
            if (state.appliedCoupon.category) {
                // Category-specific discount
                const categoryItems = state.items.filter((item)=>item.category === state.appliedCoupon.category);
                const categoryTotal = categoryItems.reduce((total, item)=>total + item.price * item.quantity, 0);
                discount = categoryTotal * state.appliedCoupon.discount / 100;
            } else {
                // General discount
                discount = subtotal * state.appliedCoupon.discount / 100;
            }
        }
        return subtotal - discount;
    };
    const getCartCount = ()=>{
        return state.items.reduce((total, item)=>total + item.quantity, 0);
    };
    const value = {
        items: state.items,
        appliedCoupon: state.appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        getCartTotal,
        getCartCount
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/CartContext.js",
        lineNumber: 208,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useCart = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
}),
"[project]/context/WishlistContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "WishlistProvider": ()=>WishlistProvider,
    "useWishlist": ()=>useWishlist
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const WishlistContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
const wishlistReducer = (state, action)=>{
    switch(action.type){
        case 'LOAD':
            return action.payload;
        case 'ADD':
            if (state.find((i)=>i.id === action.payload.id)) return state;
            return [
                ...state,
                action.payload
            ];
        case 'REMOVE':
            return state.filter((i)=>i.id !== action.payload.id);
        default:
            return state;
    }
};
const WishlistProvider = ({ children })=>{
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(wishlistReducer, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('vibe-bites-wishlist');
        if (saved) dispatch({
            type: 'LOAD',
            payload: JSON.parse(saved)
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('vibe-bites-wishlist', JSON.stringify(state));
    }, [
        state
    ]);
    const addToWishlist = (product)=>dispatch({
            type: 'ADD',
            payload: product
        });
    const removeFromWishlist = (id)=>dispatch({
            type: 'REMOVE',
            payload: {
                id
            }
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WishlistContext.Provider, {
        value: {
            items: state,
            addToWishlist,
            removeFromWishlist
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/WishlistContext.js",
        lineNumber: 37,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useWishlist = ()=>{
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(WishlistContext);
    if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
    return ctx;
};
}),
"[project]/components/Toaster.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ToastProvider": ()=>ToastProvider,
    "Toaster": ()=>Toaster,
    "useToast": ()=>useToast
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
const ToastProvider = ({ children })=>{
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const addToast = (message, type = 'success')=>{
        const id = Date.now();
        setToasts((prev)=>[
                ...prev,
                {
                    id,
                    message,
                    type
                }
            ]);
        // Auto remove after 3 seconds
        setTimeout(()=>{
            removeToast(id);
        }, 3000);
    };
    const removeToast = (id)=>{
        setToasts((prev)=>prev.filter((toast)=>toast.id !== id));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            addToast
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-4 right-4 z-50 space-y-2",
                children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `px-4 py-3 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ${toast.type === 'success' ? 'bg-green-500 text-white' : toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-vibe-cookie text-vibe-brown'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium",
                                    children: toast.message
                                }, void 0, false, {
                                    fileName: "[project]/components/Toaster.js",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>removeToast(toast.id),
                                    className: "ml-4 text-white hover:text-gray-200",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/components/Toaster.js",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Toaster.js",
                            lineNumber: 39,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, toast.id, false, {
                        fileName: "[project]/components/Toaster.js",
                        lineNumber: 29,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/components/Toaster.js",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Toaster.js",
        lineNumber: 25,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useToast = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
const Toaster = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastProvider, {}, void 0, false, {
        fileName: "[project]/components/Toaster.js",
        lineNumber: 64,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__b38cbf6e._.js.map