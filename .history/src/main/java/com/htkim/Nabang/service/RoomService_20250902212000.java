package com.htkim.Nabang.service;

import com.htkim.Nabang.dto.RoomDto;
import com.htkim.Nabang.dto.RoomImageDto;
import com.htkim.Nabang.entity.Room;
import com.htkim.Nabang.entity.RoomImage;
import com.htkim.Nabang.repository.RoomImageRepository;
import com.htkim.Nabang.repository.RoomRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.criteria.*;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomImageRepository roomImageRepository;

    @PersistenceContext
    private EntityManager em;

    // 모든 방 데이터를 불러온다
    public List<Room> index() {
        return roomRepository.findAll();
    }

    // 특정 방 데이터를 불러온다
    public Room show(Long id) {
        // id로 방 데이터를 찾는다. 없으면 null을 반환한다
        return roomRepository.findById(id).orElse(null);
    }

    // 받은 데이터로 방 데이터를 생성한다
    public Room create(RoomDto roomDto) {
        Room room = roomDto.toEntity();

        if (room.getRoomId() != null) {
            return null;
        }
        return roomRepository.save(room);
    }

    public RoomImage create(RoomImageDto roomImageDto) {
        RoomImage roomImage = roomImageDto.toEntity();

        if (roomImage.getImageId() != null) {
            return null;
        }
        return roomImageRepository.save(roomImage);
    }

    // 방 데이터 수정
    public Room update(Long id, RoomDto roomDto) {
        // Entity로 변환
        Room room = roomDto.toEntity();
        log.info("id: {}, data: {}", id, room.toString());

        // 타깃 조회
        Room target = roomRepository.findById(id).orElse(null);

        // 요청 처리
        if (target == null || !id.equals(room.getRoomId())){
            // 잘못된 요청 응답
            log.info("잘못된 요청 id: {}, data: {}", id, room.toString());
            return null;
        }

        // 업데이트 및 정상 응답
        target.patch(room);
        return roomRepository.save(target);
    }

    // 방 데이터 삭제
    public Room delete(Long id) {
        // 대상 불러오기
        Room target = roomRepository.findById(id).orElse(null);

        // 잘못된 요청 처리
        if (target == null){
            return null;
        }

        roomRepository.delete(target);
        return target;
    }

    public List<RoomImage> getImages(Long roomId) {
        return roomImageRepository.findByRoomId(roomId);
    }

    public List<RoomDto> findRoomsNear(double lon, double lat, double radius) {
        // 위도, 경도 범위 계산 (단위는 도, 대략적인 사각형 영역 검색)
        double minLon = lon - radius;
        double maxLon = lon + radius;
        double minLat = lat - radius;
        double maxLat = lat + radius;

        List<Room> rooms = roomRepository.findRoomsInBoundingBox(minLon, maxLon, minLat, maxLat);

        // 필요시 Room → RoomDto 변환 (주소, 이미지 URL 포함 등)
        return rooms.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private RoomDto convertToDto(Room room) {
        RoomDto dto = new RoomDto();
        dto.setRoomId(room.getRoomId());
        dto.setSido(room.getSido());
        dto.setSigungu(room.getSigungu());
        dto.setEmdong(room.getEmdong());
        dto.setDetailAddress(room.getDetailAddress());
        dto.setLongitude(room.getLongitude());
        dto.setLatitude(room.getLatitude());
        dto.setDeposit(room.getDeposit());
        dto.setMonthlyRent(room.getMonthlyRent());
        dto.setFloor(room.getFloor());
        dto.setRoomType(room.getRoomType());
        dto.setDealType(room.getDealType());
        // 메인 이미지 URL 처리 등 필요 시 추가
        return dto;
    }

    public List<Room> findByFilters(Map<String, String> filters) {

        System.out.println("전체 필터: " + filters);

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Room> cq = cb.createQuery(Room.class);
        Root<Room> root = cq.from(Room.class);

        List<Predicate> predicates = new ArrayList<>();

        // 1. 주소 필터 시도, 시군구
        String sido = filters.get("sido");
        if (sido != null && !sido.equals("") && !sido.equals("0")) {
            predicates.add(cb.equal(root.get("sido"), sido));
            System.out.println("sido 필터 적용: " + sido);
        }

        String sigungu = filters.get("sigungu");
        if (sigungu != null && !sigungu.equals("") && !sigungu.equals("0")) {
            predicates.add(cb.equal(root.get("sigungu"), sigungu));
            System.out.println("sigungu 필터 적용: " + sigungu);
        }

        // 2. 매물 유형(roomType) (0:전체)
        int roomType = parseIntOrDefault(filters.get("roomType"), 0);
        if (roomType != 0) {
            predicates.add(cb.equal(root.get("roomType"), roomType));
            System.out.println("roomType 필터 적용: " + roomType);
        }

        // 3. 거래 유형(dealType) (0:전체)
        int dealType = parseIntOrDefault(filters.get("dealType"), 0);
        if (dealType != 0) {
            predicates.add(cb.equal(root.get("dealType"), dealType));
            System.out.println("dealType 필터 적용: " + dealType);
        }

        // 4. 보증금 필터 (dealType != 3만)
        if (dealType != 3) {
            Integer depMin = Integer.valueOf(filters.get("depositMin"));
            Integer depMax = Integer.valueOf(filters.get("depositMax"));

            if (depMax < 0) {
                depMax = Integer.MAX_VALUE;
            }

            if (!depMin.equals(depMax)) {
                predicates.add(cb.between(root.get("deposit"), depMin, depMax));
                System.out.println("deposit 필터 적용: 범위 " + depMin + " ~ " + depMax);
            } else {
                predicates.add(cb.equal(root.get("deposit"), depMin));
                System.out.println("deposit 필터 적용: 정확히 " + depMin);
            }
        }

        // 5. 월세 필터
        if (dealType == 1) {
            Integer monMin = Integer.valueOf(filters.get("monthlyMin"));
            Integer monMax = Integer.valueOf(filters.get("monthlyMax"));

            if (monMax < 0) {
                monMax = Integer.MAX_VALUE;
            }

            if (!monMin.equals(monMax)) {
                predicates.add(cb.between(root.get("monthlyRent"), monMin, monMax));
                System.out.println("monthlyRent 필터 적용: 범위 " + monMin + " ~ " + monMax);
            } else {
                predicates.add(cb.equal(root.get("monthlyRent"), monMin));
                System.out.println("monthlyRent 필터 적용: 정확히 " + monMin);
            }
        }

        // 6. 방 크기(roomSize) min~max
        Integer sizeMin = parseIntOrNull(filters.get("roomSizeMin"));
        Integer sizeMax = parseIntOrNull(filters.get("roomSizeMax"));
        if (sizeMin != null && sizeMax != null) {
            if (!sizeMin.equals(sizeMax)) {
                predicates.add(cb.between(root.get("roomSize"), sizeMin, sizeMax));
                System.out.println("roomSize 필터 적용: 범위 " + sizeMin + " ~ " + sizeMax);
            } else {
                predicates.add(cb.equal(root.get("roomSize"), sizeMin));
                System.out.println("roomSize 필터 적용: 정확히 " + sizeMin);
            }
        }

        // 7. 층수 필터
        int floor = parseIntOrDefault(filters.get("floor"), 0);
        switch(floor) {
            case 1: // 1층만
                predicates.add(cb.equal(root.get("floor"), 1));
                System.out.println("floor 필터 적용: 1층만");
                break;
            case 2: // 2층 이상
                predicates.add(cb.greaterThanOrEqualTo(root.get("floor"), 2));
                System.out.println("floor 필터 적용: 2층 이상");
                break;
            case 3: // 반지하(음수 or -1)
                predicates.add(cb.equal(root.get("floor"), -1));
                System.out.println("floor 필터 적용: 반지하");
                break;
            default:
                System.out.println("floor 필터 없음");
        }

        // 8. 옵션 (엘리베이터, 주차, 옵션여부)
        if ("true".equalsIgnoreCase(filters.get("hasElevator"))) {
            predicates.add(cb.isTrue(root.get("isElevator")));
            System.out.println("isElevator 필터 적용");
        }
        if ("true".equalsIgnoreCase(filters.get("hasParking"))) {
            predicates.add(cb.isTrue(root.get("isParking")));
            System.out.println("isParking 필터 적용");
        }
        if ("true".equalsIgnoreCase(filters.get("hasOption"))) {
            predicates.add(cb.isTrue(root.get("hasOption")));
            System.out.println("hasOption 필터 적용");
        }

        // 9. 생활 점수 (noiseSaftyScore, disasterSaftyScore, storeScore)
        System.out.println("소음: " + filters.get("noise"));
        noiseScoreAtLeast(filters.get("noise"), cb, root, predicates);
        System.out.println("재난: " + filters.get("safety"));
        safetyScoreAtLeast(filters.get("safety"), cb, root, predicates);
        System.out.println("상점: " + filters.get("store"));
        storeScoreAtLeast(filters.get("store"), cb, root, predicates);

        cq.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(cq).getResultList();
    }

    private int parseIntOrDefault(String s, int defaultVal) {
        try {
            return Integer.parseInt(s);
        } catch(Exception e) {
            return defaultVal;
        }
    }

    private Integer parseIntOrNull(String s) {
        try {
            return Integer.parseInt(s);
        } catch(Exception e) {
            return null;
        }
    }

    private void noiseScoreAtLeast(String filterValue, CriteriaBuilder cb, Root<Room> root, List<Predicate> predicates) {
        if (filterValue == null) return;
        switch (filterValue) {
            case "1":
                predicates.add(cb.equal(root.get("noiseSaftyScore"), 1));
                break;
            case "0":
                break;
        }
    }

    private void safetyScoreAtLeast(String filterValue, CriteriaBuilder cb, Root<Room> root, List<Predicate> predicates) {
        if (filterValue == null) return;
        switch (filterValue) {
            case "1":
                predicates.add(cb.equal(root.get("disasterSaftyScore"), 1));
                break;
            case "0":
                break;
        }
    }

    private void storeScoreAtLeast(String filterValue, CriteriaBuilder cb, Root<Room> root, List<Predicate> predicates) {
        if (filterValue == null) return;
        switch (filterValue) {
            case "1":
                predicates.add(cb.equal(root.get("storeScore"), 1));
                break;
            case "2":
                predicates.add(cb.equal(root.get("storeScore"), 2));
                break;
            case "0":
                break;
        }
    }
}
