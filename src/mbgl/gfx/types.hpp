#pragma once

#include <cstdint>

namespace mbgl {
namespace gfx {

enum class PrimitiveType : uint8_t {
    Points,
    Lines,
    LineLoop,
    LineStrip,
    Triangles,
    TriangleStrip,
    TriangleFan,
};

enum class ColorBlendEquationType : uint8_t {
    Add,
    Subtract,
    ReverseSubtract,
};

enum class ColorBlendFactorType : uint8_t {
    Zero,
    One,
    SrcColor,
    OneMinusSrcColor,
    SrcAlpha,
    OneMinusSrcAlpha,
    DstAlpha,
    OneMinusDstAlpha,
    DstColor,
    OneMinusDstColor,
    SrcAlphaSaturate,
    ConstantColor,
    OneMinusConstantColor,
    ConstantAlpha,
    OneMinusConstantAlpha,
};

enum class DepthFunctionType : uint8_t {
    Never,
    Less,
    Equal,
    LessEqual,
    Greater,
    NotEqual,
    GreaterEqual,
    Always,
};

enum class DepthMaskType : bool {
    ReadOnly = false,
    ReadWrite = true,
};

enum class StencilFunctionType : uint8_t {
    Never,
    Less,
    Equal,
    LessEqual,
    Greater,
    NotEqual,
    GreaterEqual,
    Always,
};

enum class StencilOpType : uint8_t {
    Zero,
    Keep,
    Replace,
    Increment,
    Decrement,
    Invert,
    IncrementWrap,
    DecrementWrap,
};

enum CullFaceSideType : uint8_t {
    Front,
    Back,
    FrontAndBack,
};

enum CullFaceWindingType : uint8_t {
    Clockwise,
    CounterClockwise,
};

} // namespace gfx
} // namespace mbgl
