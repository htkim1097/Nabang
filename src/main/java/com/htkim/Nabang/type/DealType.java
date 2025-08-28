package com.htkim.Nabang.type;

public final class DealType extends EnumData {

    public static final DealType ALL = new DealType("전체", 0);
    public static final DealType MONTHLY_RENT = new DealType("월세", 1);
    public static final DealType JEONSE = new DealType("전세", 2);
    public static final DealType SALE = new DealType("매매", 3);

    private DealType(String name, int code) {
        super(name, code);
    }
}
