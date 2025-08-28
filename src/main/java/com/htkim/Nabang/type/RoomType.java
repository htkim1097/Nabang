package com.htkim.Nabang.type;

public final class RoomType extends EnumData {

    public static final RoomType ALL = new RoomType("전체", 0);
    public static final RoomType ONEROOM = new RoomType("원룸", 1);
    public static final RoomType TWOROOM = new RoomType("투룸", 2);
    public static final RoomType APARTMENT = new RoomType("아파트", 3);

    private RoomType(String name, int code) {
        super(name, code);
    }
}
