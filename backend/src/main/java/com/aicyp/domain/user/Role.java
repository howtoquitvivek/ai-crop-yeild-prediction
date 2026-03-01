package com.aicyp.domain.user;

/**
 * Role access policy:
 *
 * FARMER:
 * - Own profile access
 * - Farm domain
 * - Prediction
 * - Recommendation
 *
 * ADMIN:
 * - All FARMER permissions
 * - User management
 * - Analytics
 * - System meta
 */

public enum Role {
  FARMER,
  ADMIN
}