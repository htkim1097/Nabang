package com.htkim.Nabang.type;

public final class DealStatus extends EnumData {

    public static final DealStatus AVAILABLE = new DealStatus("거래가능", 1);
    public static final DealStatus PENDING = new DealStatus("거래중", 2);
    public static final DealStatus SOLD = new DealStatus("거래완료", 3);

    private DealStatus(String name, int code) {
        super(name, code);
    }
}
