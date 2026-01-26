package com.neurolensai.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetectionResult {
    private double score ;
    private String label ;
}
