import express from "express";

export interface v1Component {
    base: string;
    routes: express.Router;
}