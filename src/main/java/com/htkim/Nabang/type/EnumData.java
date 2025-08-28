package com.htkim.Nabang.type;

public class EnumData {
    private final String name;
    private final int code;

    public EnumData(String name, int code) {
        this.name = name;
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public int getCode() {
        return code;
    }

    @Override
    public String toString() {
        return name;
    }
}